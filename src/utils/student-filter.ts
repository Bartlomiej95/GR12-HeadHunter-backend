import { StudentEntity } from "src/student/student.entity";

export const studentFilter = (student: StudentEntity): StudentEntity => {
    student.portfolioUrls = JSON.parse(student.portfolioUrls);
    student.projectUrls = JSON.parse(student.projectUrls);
    student.bonusProjectUrls = JSON.parse(student.bonusProjectUrls)

    return student;
}