import * as path from 'path';
import { readFile, unlink } from 'fs/promises';
import { Injectable } from '@nestjs/common';
import { Role, StudentCVResponse, UploadeFileMulter, UserImport, UserResponse } from 'src/types';
import { destionation } from 'src/multer/multer.storage';
import { studentDataValidator } from 'src/utils/student-validation';
import { StudentEntity } from './student.entity';
import { UserEntity } from 'src/auth/user.entity';
import { randomSigns } from 'src/utils/random-signs';
import { safetyConfiguration } from 'config';
import { sendActivationLink } from 'src/utils/email-handler';
import { UserStatus } from 'src/types';
import { studentFilter } from 'src/utils/student-filter';
import { StudentExtendedData, StudentExtendedDataPatch } from './dto/extended-data.dto';
import { FindOptionsWhere, Not } from 'typeorm';

interface Progress {
    added: number;
    fold: number;
    iterations: number;
}

@Injectable()
export class StudentService {

    async addStudentFromList(file: UploadeFileMulter): Promise<Progress> {
        const data = (await readFile(path.join(destionation(), file.file[0].filename))) as unknown as string;
        const uncoded = await JSON.parse(data) as UserImport[];

        const addedStudents = await Promise.all(uncoded.map(async (student) => {
            const validation = await studentDataValidator(student);


            if (!validation) {
                return false
            }

            try {
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

                await sendActivationLink(newUser.link, newUser.email, 'student');

                return true;
            } catch (err) {
                console.log(err)
                return false
            }
        }));

        await unlink(path.join(destionation(), file.file[0].filename));

        const result = {
            iterations: 0,
            added: 0,
            fold: 0
        }

        await Promise.all(addedStudents.map(status => {
            result.iterations++;
            if (status) {
                result.added++
            } else {
                result.fold++
            }
        }))

        return result;
    }

    async getFreeStudnetList() {
        const result = await StudentEntity.find({
            where: {
                reservationStatus: UserStatus.AVAILABLE,
                areDataPatched: true,
            },
            relations: {
                user: true,
            }
        })

        const activeStudent = result.filter(student => student.user.isActive === true);
        const toSend = activeStudent.map(student => ({ ...student, user: 'active' }))

        return toSend;
    }

    async getOneStudent(id: string): Promise<StudentEntity | null> {
        const result = await StudentEntity.findOne({
            where: {
                id,
                areDataPatched: true
            }
        })

        if (!result) return null;

        const data = studentFilter(result)
        return data;
    }

    async addStudentdata(data: StudentExtendedData): Promise<UserResponse> {

        try {
            const user = await UserEntity.findOne({
                where: {
                    email: data.email
                }
            })

            if (!user) return {
                actionStatus: false,
                message: 'użytkownik nie istnieje w bazie',
            }



            const student = await StudentEntity.findOne({
                where: {
                    user: user as FindOptionsWhere<UserEntity>
                }
            })

            if (!student) return {
                actionStatus: false,
                message: 'Konto kursanta nie istnieje',
            }

            const githubValid = await StudentEntity.findOne({
                where: {
                    githubUsername: data.githubUsername
                }
            })

            if (githubValid) {
                return {
                    actionStatus: false,
                    message: 'podane konto github jest już w bazie',
                }
            }

            user.firstName = data.firstName;
            user.lastName = data.lastName;

            await user.save()

            student.tel = data.tel;
            student.githubUsername = data.githubUsername;
            student.portfolioUrls = JSON.stringify(data.portfolioUrls);
            student.githubUsername = data.githubUsername;
            student.portfolioUrls = JSON.stringify(data.portfolioUrls);
            student.projectUrls = JSON.stringify(data.projectUrls);
            student.bio = data.bio;
            student.expectedTypeWork = data.expectedTypeWork;
            student.targetWorkCity = data.targetWorkCity;
            student.expectedContractType = data.expectedContractType;
            student.expectedSalary = data.expectedSalary;
            student.canTakeApprenticeship = data.canTakeApprenticeship;
            student.monthsOfCommercialExp = data.monthsOfCommercialExp;
            student.education = data.education;
            student.workExperience = data.workExperience;
            student.courses = data.courses;
            student.areDataPatched = true;

            await student.save()

            return {
                actionStatus: true,
                message: 'dane zostały zapisane poprawnie',
            }
        } catch (err) {
            console.log(err)
            return {
                actionStatus: false,
                message: 'błąd serwera',
            }
        }
    }

    async patchStudentData(user: UserEntity, data: StudentExtendedDataPatch): Promise<UserResponse> {
        try {


            const student = await StudentEntity.findOne({
                where: {
                    user: user as FindOptionsWhere<UserEntity>
                }
            })

            if (!student) {
                return {
                    actionStatus: false,
                    message: 'taki kursant nie istnieje',
                }
            }


            const gitHubValid = await StudentEntity.find({
                where: {
                    id: Not(student.id),
                    githubUsername: data.githubUsername
                }
            })

            if (gitHubValid.length > 0) {
                return {
                    actionStatus: false,
                    message: 'podane konto github jest już w bazie',
                }
            }

            user.firstName = data.firstName;
            user.lastName = data.lastName;

            await user.save()

            student.tel = data.tel;
            student.githubUsername = data.githubUsername;
            student.portfolioUrls = JSON.stringify(data.portfolioUrls);
            student.githubUsername = data.githubUsername;
            student.portfolioUrls = JSON.stringify(data.portfolioUrls);
            student.projectUrls = JSON.stringify(data.projectUrls);
            student.bio = data.bio;
            student.expectedTypeWork = data.expectedTypeWork;
            student.targetWorkCity = data.targetWorkCity;
            student.expectedContractType = data.expectedContractType;
            student.expectedSalary = data.expectedSalary;
            student.canTakeApprenticeship = data.canTakeApprenticeship;
            student.monthsOfCommercialExp = data.monthsOfCommercialExp;
            student.education = data.education;
            student.workExperience = data.workExperience;
            student.courses = data.courses;
            student.areDataPatched = true;

            await student.save()

            return {
                actionStatus: true,
                message: 'Dane zostały zaktualizowane',
            }
        } catch (err) {
            console.log(err)
            return {
                actionStatus: false,
                message: 'Błąd serwera',
            }
        }

    }
}
