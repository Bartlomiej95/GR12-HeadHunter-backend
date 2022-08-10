import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { cronConfiguration, safetyConfiguration } from 'config';
import { AfterAddData, UserResponse } from 'src/types';
import { randomSigns } from 'src/utils/random-signs';
import { HrDto } from './dto/hr-add.dto';
import { HrEntity } from './hr.entity';
import { Role } from 'src/types';
import { sendActivationLink } from 'src/utils/email-handler';
import { UserEntity } from 'src/auth/user.entity';
import { FindOptionsWhere } from 'typeorm';
import { StudentEntity } from 'src/student/student.entity';
import { UserStatus } from 'src/types/user/user.status';
import { StudentService } from 'src/student/student.service';
import { HrMsgEntity } from './hr-msg.entity';
import { StudentReservationEntity } from '../student/reservation.entity';

@Injectable()
export class HrService {
  constructor(
    @Inject(forwardRef(() => StudentService))
    private studentService: StudentService,
  ) {}

  addDays(days: number = cronConfiguration.returnTime) {
    const date = new Date();
    date.setDate(date.getDate() + days);
    return date;
  }

  async addHrUser(data: HrDto): Promise<AfterAddData> {
    const user = new UserEntity();

    user.email = data.email;
    user.link = randomSigns(safetyConfiguration.linkLength);
    user.role = Role.recruiter;
    user.firstName = data.firstName;
    user.lastName = data.lastName;

    await user.save();

    const hr = new HrEntity();
    hr.company = data.company;
    hr.maxReservedStudents = data.maxReservedStudents;
    hr.user = user;

    await hr.save();

    await sendActivationLink(user.link, user.email, 'recruiter');

    return {
      actionStatus: true,
      message: 'Rekruter dodany',
    };
  }

  async AddStudentToList(user: UserEntity, id: string): Promise<UserResponse> {
    try {
      const HrUser = await HrEntity.findOne({
        select: ['id', 'maxReservedStudents', 'StudentReservation'],
        where: {
          user: user as FindOptionsWhere<UserEntity>,
        },
        relations: {
          StudentReservation: true,
        },
      });

      const onList = HrUser.StudentReservation.length;
      const maxCount = HrUser.maxReservedStudents;
      const validator = maxCount > onList;

      if (!validator) {
        return {
          actionStatus: false,
          message:
            'Posiadasz już maksymalną dozwoloną liczbę kursantów do rozmowy',
        };
      }
      const student = await StudentEntity.findOne({
        select: ['id'],
        where: {
          id,
        },

        relations: {
          StudentReservation: true,
        },
      });
      if (!student) {
        return {
          actionStatus: false,
          message: 'Podany kursant nie istnieje w bazie',
        };
      }
      const studentReservation = await StudentReservationEntity.findOne({
        select: ['id'],
        where: {
          idHr: HrUser as FindOptionsWhere<HrEntity>,
          idStudent: student as FindOptionsWhere<StudentEntity>,
        },
        relations: {
          idHr: true,
          idStudent: true,
        },
      });

      if (!!studentReservation) {
        return {
          actionStatus: false,
          message: 'Podany kursant już jest zarejestrowany przez ciebie',
        };
      }
      const newStudentReservation = new StudentReservationEntity();
      newStudentReservation.idHr = HrUser.id;
      newStudentReservation.idStudent = student.id;
      newStudentReservation.reservationStatus = UserStatus.DURING;
      newStudentReservation.reservationEnd = this.addDays();

      await newStudentReservation.save();

      return {
        actionStatus: true,
        message: 'student dodany do rozmowy',
      };
    } catch (err) {
      console.log(err);
      return {
        actionStatus: false,
        message: 'błąd serwera',
      };
    }
  }

  async studentPushback(id: string, user: UserEntity): Promise<UserResponse> {
    try {
      const result = await StudentReservationEntity.delete({
        idHr: user.id,
        idStudent: id,
      });

      if (!result) {
        return {
          actionStatus: false,
          message: 'Kursant o podanym id nie istnieje',
        };
      }

      await result;
      return {
        actionStatus: true,
        message: 'Kursant nie jest już na rozmowie',
      };
    } catch (err) {
      console.log(err);
      return {
        actionStatus: false,
        message: 'Błąd serwera',
      };
    }
  }

  async hireStudent(id: string, recruiter: UserEntity): Promise<UserResponse> {
    try {
      const student = await StudentEntity.findOne({
        select: ['id', 'StudentReservation'],
        where: {
          id,
        },
      });

      if (!student) {
        return {
          actionStatus: false,
          message: 'Kursant o podanym id nie istnieje',
        };
      }

      const hr = await HrEntity.findOne({
        select: ['id'],
        where: {
          user: recruiter as FindOptionsWhere<UserEntity>,
        },
      });

      const studentReservation = await StudentReservationEntity.findOne({
        select: ['id', 'reservationStatus'],
        where: {
          idHr: hr.id,
          idStudent: student.id,
        },
      });

      if (!studentReservation) {
        return {
          actionStatus: false,
          message: 'Próba zatrudnienia kursanta nie wybranego przez rekrutera!',
        };
      }

      studentReservation.reservationStatus = UserStatus.HIRED;
      studentReservation.reservationEnd = null;
      student.user.isActive = false;

      await student.save();
      await student.user.save();

      //sent msg to admin
      const hrMsg = new HrMsgEntity();
      hrMsg.hr = hr;
      hrMsg.student = student;

      await hrMsg.save();

      return {
        actionStatus: true,
        message: 'Kursant został zatrudniony przez HR',
      };
    } catch (err) {
      console.log(err);
      return {
        actionStatus: false,
        message: 'Błąd serwera',
      };
    }
  }

  async getMessages() {
    try {
      const messages = await HrMsgEntity.find({
        relations: ['hr', 'student', 'hr.user', 'student.user'],
      });

      const resData = messages.map((item) => {
        return {
          msg:
            `W dniu: ${item.hiredAt.toDateString()},` +
            ` rekruter: ${item.hr.user.firstName} ${item.hr.user.lastName} z firmy: ${item.hr.company}, (e-mail: ${item.hr.user.email}),` +
            ` zatrudnił studenta MegaK: ${item.student.user.firstName} ${item.student.user.lastName}, (e-mail: ${item.student.user.email})`,
          isRead: item.isRead,
        };
      });

      return {
        actionStatus: true,
        data: resData,
      };
    } catch (err) {
      console.log(err);
      return {
        actionStatus: false,
        message: 'Błąd serwera',
      };
    }
  }
}
