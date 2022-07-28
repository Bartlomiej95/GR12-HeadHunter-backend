import {forwardRef, Inject, Injectable } from '@nestjs/common';
import { safetyConfiguration } from 'config';
import { AfterAddData, StudentCVResponse, UserResponse } from 'src/types';
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

@Injectable()
export class HrService {
    constructor(
        @Inject(forwardRef(() => StudentService)) private studentService: StudentService,
    ) {
    }

    async addHrUser(data: HrDto): Promise<AfterAddData> {

        const user = new UserEntity();

        user.email = data.email;
        user.link = randomSigns(safetyConfiguration.linkLength);
        user.role = Role.recruiter

        await user.save()

        const hr = new HrEntity()
        hr.company = data.company;
        hr.fullName = data.fullName;
        hr.maxReservedStudents = data.maxReservedStudents;
        hr.user = user;

        await hr.save()

        await sendActivationLink(user.link, 'recruiter', user.email);

        return {
            actionStatus: true,
            message: 'Rekruter dodany',
        }
    }

    async AddStudentToList(user: UserEntity, id: string): Promise<UserResponse> {

        const HrUser = await HrEntity.findOne({
            where: {
                user: user as FindOptionsWhere<UserEntity>
            },
            relations: {
                reservedStudents: true
            }
        })

        const onList = HrUser.reservedStudents.length;
        const maxCount = HrUser.maxReservedStudents;
        const validator = maxCount >= onList;

        if (!validator) {
            return {
                actionStatus: false,
                message: 'Posiadasz już maksymalną dozwoloną liczbę kursantów do rozmowy'
            }
        }

        const student = await StudentEntity.findOne({
            where: {
                id,
            }
        })

        if (!student) {
            return {
                actionStatus: false,
                message: 'Podany kursant nie istnieje w bazie'
            }
        }
        if (student.reservationStatus !== UserStatus.AVAILABLE) {
            return {
                actionStatus: false,
                message: 'Podany kursant jest już wybrany przez innego rekrutera'
            }
        }

        student.hr = HrUser;
        student.reservationStatus = UserStatus.DURING;

        await student.save();

        return {
            actionStatus: true,
            message: 'student dodany do rozmowy'
        }
    }

    async getStudentCV(hrId, studentId): Promise<StudentCVResponse> {
        const cv = await this.studentService.getCV(studentId);
        const hr = await HrEntity.findOneOrFail({
            where: {
                id: hrId
            }
        });

        if(cv.hrId !== null && cv.hrId === hrId) {
            return cv;
        } else {
            throw new Error("Nie wybrałeś podanego kursanta");
        }
    }
}
