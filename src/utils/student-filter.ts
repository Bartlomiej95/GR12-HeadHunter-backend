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