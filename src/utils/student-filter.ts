import { StudentExtendedDataPatch } from "src/student/dto/extended-data.dto";
import { StudentEntity } from "src/student/student.entity";
import { StudentCVResponse, StudentListResponse } from "src/types";

export const studentFilter = (student: StudentEntity): StudentCVResponse => {

    const filtredStudent = {
        ...student,
        portfolioUrls: JSON.parse(student.portfolioUrls),
        projectUrls: JSON.parse(student.projectUrls),
        bonusProjectUrls: JSON.parse(student.bonusProjectUrls),
        firstName: student.user.firstName,
        lastName: student.user.lastName,
        email: student.user.email,
        user: 'active'
    }

    return filtredStudent;
}

export const studentListFilter = (student: StudentEntity): StudentListResponse => {

    const filteredData = {
        id: student.id,
        firstName: student.user.firstName,
        lastName: student.user.lastName[0] + '.',
        courseCompletion: student.courseCompletion,
        courseEngagment: student.courseEngagment,
        projectDegree: student.projectDegree,
        teamProjectDegree: student.teamProjectDegree,
        expectedTypeWork: student.expectedTypeWork,
        targetWorkCity: student.targetWorkCity,
        expectedContractType: student.expectedContractType,
        expectedSalary: student.expectedSalary,
        canTakeApprenticeship: student.canTakeApprenticeship,
        monthsOfCommercialExp: student.monthsOfCommercialExp
    }

    return filteredData
}


export const listForHrFilter = async (student: StudentEntity): Promise<StudentCVResponse> => {

    const result = await StudentEntity.findOne({
        where: {
            id: student.id
        },
        relations: {
            user: true
        }
    })

    if (!result) throw new Error('Can`t find student');

    const filteredData = {
        ...result,
        portfolioUrls: JSON.parse(result.portfolioUrls),
        projectUrls: JSON.parse(result.projectUrls),
        bonusProjectUrls: JSON.parse(result.bonusProjectUrls),
        firstName: result.user.firstName,
        lastName: result.user.lastName,
        email: result.user.email,
        user: 'active',
    }

    return filteredData;

}   

export const availabeForPatchStudentData = (student: StudentEntity): StudentExtendedDataPatch => {
    const response = {
        tel: student.tel,
        firstName: student.user.firstName,
        lastName: student.user.lastName,
        githubUsername: student.githubUsername,
        portfolioUrls: JSON.parse(student.portfolioUrls),
        projectUrls: JSON.parse(student.projectUrls),
        bio: student.bio,
        expectedTypeWork: student.expectedTypeWork,
        targetWorkCity: student.targetWorkCity,
        expectedContractType: student.expectedContractType,
        expectedSalary: student.expectedSalary,
        canTakeApprenticeship: student.canTakeApprenticeship,
        monthsOfCommercialExp: student.monthsOfCommercialExp,
        education: student.education,
        workExperience: student.workExperience,
        courses: student.courses
    }

    return response
}