import { Body, Controller, Get, Post, Res } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Response } from 'express';
import { authLoginDto } from './dto/auth-login.dto';

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
}
