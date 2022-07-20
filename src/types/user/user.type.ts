export enum Role {
  admin = 'admin',
  student = 'student',
  recruiter = 'recruiter',
}

export interface Code {
  coded: string;
  iv: string;
}
