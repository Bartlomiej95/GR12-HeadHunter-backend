import * as path from 'path';
import { readFile, unlink } from 'fs/promises';
import { Injectable } from '@nestjs/common';
import { Role, StudentCVResponse, UploadeFileMulter, UserImport } from 'src/types';
import { destionation } from 'src/multer/multer.storage';
import { studentDataValidator } from 'src/utils/student-validation';
import { StudentEntity } from './student.entity';
import { UserEntity } from 'src/auth/user.entity';
import { randomSigns } from 'src/utils/random-signs';
import { safetyConfiguration } from 'config';
import { sendActivationLink } from 'src/utils/email-handler';
import { UserStatus } from 'src/types';
import {HrEntity} from "../hr/hr.entity";


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

    async changeStatus(id: string, status: UserStatus): Promise<string> {
        const student = await StudentEntity.findOneOrFail({
            relations: ['user'],
            where: {
                id
            }
        });

        switch (status) {
            case UserStatus.AVAILABLE:
                //recruiter does it
                break;
            case UserStatus.DURING:
                //recruiter does it
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

    async getCV(id: string): Promise<StudentCVResponse> {

        const student = await StudentEntity.findOneOrFail({
            relations: ['user','hr'],
            where: {
                id
            }
        });

        const cv: StudentCVResponse = {
            email: student.user.email,
            courseCompletion: student.courseCompletion,
            courseEngagment: student.courseEngagment,
            projectDegree: student.projectDegree,
            teamProjectDegree: student.teamProjectDegree,
            bonusProjectUrls: JSON.parse(student.bonusProjectUrls),
            tel: student.tel,
            firstName: student.firstName,
            lastName: student.lastName,
            githubUsername: student.githubUsername,
            portfolioUrls: JSON.parse(student.portfolioUrls),
            projectUrls: JSON.parse(student.projectUrls),
            bio: student.bio,
            expectedTypeWork: student.expectedTypeWork,
            targetWorkCity: student.targetWorkCity,
            expectedContractType: student.expectedContractType,
            expectedSalary: Number(student.expectedSalary),
            canTakeApprenticeship: student.canTakeApprenticeship,
            monthsOfCommercialExp: student.monthsOfCommercialExp,
            education: student.education,
            workExperience: student.workExperience,
            courses: student.courses,
            hrId: student.hr.id,
        };

        return cv;
    }

    async studentsSelectedByHr(hrId: string) {
        try {
            const hr = await HrEntity.findOne({where: { id: hrId}});
            if(!hr){
                return {
                    actionStatus: false,
                    message: 'Nie istnieje w bazie HR o takim id',
                    students: [],
                }
            }

            const students = await StudentEntity.findByHrId(hrId);
            if(!students){
                return{
                    actionStatus: false,
                    message: 'Nie masz wybranych żadnych studentów',
                    students: [],
                }
            }

            return {
                actionStatus: true,
                message: `Aktualnie masz wybranych ${students.length}`,
                students: students,
            }
        } catch(e) {
            throw new Error(e);
        }
    }
}
