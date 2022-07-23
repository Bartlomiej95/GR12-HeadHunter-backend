import { Body, Controller, Get, Post, Res } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Response } from 'express';
import { authLoginDto } from './dto/auth-login.dto';
import { RegistrationData } from './dto/registration.dto';

@Controller('login')
export class AuthController {
    constructor(
        private readonly authService: AuthService
    ) { }

    @Post('/')
    loginFunction(
        @Body() req: authLoginDto,
        @Res() res: Response
    ) {
        return this.authService.login(req, res);
    }

    @Post('/register')
    async userRegistration(
        @Body() req: RegistrationData,
        @Res() res: Response
    ) {
        return await this.authService.register(req, res);
    }
}
