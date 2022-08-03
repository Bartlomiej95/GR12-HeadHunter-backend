import { StudentEntity } from "src/student/student.entity";
import { HrStudentList, StudentCVResponse, StudentListResponse } from "src/types";

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
        lastName: student.user.lastName,
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


export const listForHrFilter = async (student: StudentEntity): Promise<HrStudentList> => {
    const reservationEnd = student.reservationEnd;
    const id = student.id;

    const result = await StudentEntity.findOne({
        where: {
            id: student.id
        },
        relations: {
            user: true
        }
    })

    if (!result) throw new Error('Can`t find student');

    const firstName = result.user.firstName;
    const lastName = result.user.lastName;

    return {
        id,
        reservationEnd,
        firstName,
        lastName
    }

}   