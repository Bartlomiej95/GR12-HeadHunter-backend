import { Login } from '../../types';

export class authLoginDto implements Login{
    email: string;
    password: string;
}