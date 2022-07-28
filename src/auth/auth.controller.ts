import { Body, Controller, Get, Post, Res, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Response } from 'express';
import { authLoginDto } from './dto/auth-login.dto';
import { RegistrationData } from './dto/registration.dto';
import { UserObject } from 'src/decorators/user-object.decorator';
import { AuthGuard } from '../guards/Auth.guard';
import { UserEntity } from './user.entity';
import { PassChange } from './dto/pass-change.dto';
import { EmailChanging } from './dto/email-change.dto';

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

    @Post('/reset')
    async passwordReset(
        @Body() body: { email: string }
    ) {
        return await this.authService.sendResetPasswordLink(body.email)
    }

    @Get('/out')
    @UseGuards(AuthGuard)
    async logout(
        @UserObject() user: UserEntity,
        @Res() res: Response
    ) {
        await this.authService.logout(user, res);
        return { ok: true }
    }

    @Get('/check')
    @UseGuards(AuthGuard)
    async userLoginCheck(
        @UserObject() user: UserEntity,
    ) {
        return {
            logedIn: true,
            message: { role: user.role, firstName: user.firstName, lasyName: user.lastName },
        }

    }

    @Post('/passchange')
    @UseGuards(AuthGuard)
    async passwordChange(
        @UserObject() user: UserEntity,
        @Body() data: PassChange,
        @Res() res: Response
    ) {
        return await this.authService.passwordChanging(user, data, res)
    }

    @Post('/emailchange')
    @UseGuards(AuthGuard)
    async emailChange(
        @Body() data: EmailChanging,
        @UserObject() user: UserEntity,
    ) {
        return await this.authService.emailChanging(user, data)
    }
}
