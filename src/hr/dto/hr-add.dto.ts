import { HrRegister } from '../../types';

export class HrDto implements HrRegister {
    email: string;
    fullName: string;
    company: string;
    maxReservedStudents: number;
}