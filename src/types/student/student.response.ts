import { rating } from "../user/user.import.type";
import {ExpectedContractType, ExpectedTypeWork } from "../user/user.register.type";
import {StudentEntity} from "../../student/student.entity";

export interface ChangeStudentStatusResponse {
    actionStatus: boolean;
    data: string | null;
}

export interface StudentCVResponse {
    id?: string;     
    email: string;
    courseCompletion: rating;
    courseEngagment: rating;
    projectDegree: rating;
    teamProjectDegree: rating;
    bonusProjectUrls: string[];
    tel: number;
    firstName: string;
    lastName: string;
    githubUsername: string;
    portfolioUrls: string[];
    projectUrls: string[];
    bio: string;
    expectedTypeWork: ExpectedTypeWork;
    targetWorkCity: string;
    expectedContractType: ExpectedContractType;
    expectedSalary: number | null;
    canTakeApprenticeship: boolean;
    monthsOfCommercialExp: number;
    education: string | null;
    workExperience: string;
    courses: string;
    hrId: string | null;
}

export interface StudentsSelectedByHrResponse {
    actionStatus: boolean,
    message: StudentEntity[] | string,
}