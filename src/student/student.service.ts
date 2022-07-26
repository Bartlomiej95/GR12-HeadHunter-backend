import * as path from 'path';
import { readFile, unlink } from 'fs/promises';
import { Injectable } from '@nestjs/common';
import { Role, UploadeFileMulter, UserImport } from 'src/types';
import { destionation } from 'src/multer/multer.storage';
import { studentDataValidator } from 'src/utils/student-validation';
import { StudentEntity } from './student.entity';
import { UserEntity } from 'src/auth/user.entity';
import { randomSigns } from 'src/utils/random-signs';
import { safetyConfiguration } from 'config';
import { sendActivationLink } from 'src/utils/email-handler';
import { UserStatus } from 'src/types';


@Injectable()
export class StudentService {

    async addStudentFromList(file: UploadeFileMulter): Promise<boolean> {
        const data = (await readFile(path.join(destionation(), file.file[0].filename))) as unknown as string;
        const uncoded = await JSON.parse(data) as UserImport[];

        uncoded.forEach(async (student) => {
            const validation = await studentDataValidator(student);

            if (!validation) {
                return
            }
            const newUser = new UserEntity();

            newUser.email = student.email;
            newUser.role = Role.student;
            newUser.link = randomSigns(safetyConfiguration.linkLength);

            await newUser.save();

            const newStudent = new StudentEntity();

            newStudent.projectDegree = student.projectDegree;
            newStudent.teamProjectDegree = student.teamProjectDegree;
            newStudent.courseEngagment = student.courseEngagement;
            newStudent.courseCompletion = student.courseCompletion;
            newStudent.bonusProjectUrls = JSON.stringify(student.bonusProjectUrls);
            newStudent.user = newUser;

            await newStudent.save()

            await sendActivationLink(newUser.link, 'student', newUser.email)

        });

        await unlink(path.join(destionation(), file.file[0].filename));

        return true;
    }

    async getFreeStudnetList() {
        const result = await StudentEntity.find({
            where: {
                reservationStatus: UserStatus.AVAILABLE
            },
            relations: {
                user: true,
            }
        })

        const activeStudent = result.filter(student => student.user.isActive === true);
        const toSend = activeStudent.map(student => ({ ...student, user: 'active' }))

        return toSend;
    }

    async changeStatus(id: string, status: UserStatus) {
        const student = await StudentEntity.findOneOrFail({
            relations: ['user'],
            where: {
                id
            }
        });

        switch (status) {
            case UserStatus.AVAILABLE:
                break;
            case UserStatus.DURING:
                break;
            case UserStatus.HIRED:
                student.reservationStatus = UserStatus.HIRED;
                student.user.isActive = false;
                student.save();
                student.user.save();
                break;
            default:
                throw new Error('unknown status');
        }

        return `student status for student id: ${id} was changed into: ${status}`;

    }
}
