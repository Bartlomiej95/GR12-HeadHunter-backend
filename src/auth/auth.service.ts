import { Injectable } from '@nestjs/common';
import { authLoginDto } from './dto/auth-login.dto';
import { Response } from 'express';
import { UserEntity } from './user.entity';
import { v4 as uuid } from 'uuid';
import { sign } from 'jsonwebtoken';
import { JwtPayload } from './jwt.strategy';
import { comparer, hasher } from './crypto';
import { frontConfiguration, safetyConfiguration } from 'config';


@Injectable()
export class AuthService {

    private createToken(currentTokneId: string): { accesToken: string, expiresIn: number } {
        const payload: JwtPayload = { id: currentTokneId };
        const expiresIn = 60 * 60 * 24;
        const accesToken = sign(payload, safetyConfiguration.jwtKey, { expiresIn })
        return {
            accesToken,
            expiresIn
        }
    }

    private async generateToken(user: UserEntity): Promise<string> {
        let token: string;
        let UserWithThisToken = null;
        do {
            token = uuid();
            UserWithThisToken = await UserEntity.findOne({
                where: {
                    jwt: token
                }
            })
        } while (!!UserWithThisToken);
        user.jwt = token;
        await user.save();

        return token;
    }

    async login(req: authLoginDto, res: Response): Promise<any> {
        try {
            const user = await UserEntity.findOne({
                where: {
                    email: req.email
                }
            })

            if (!user) {
                return res.json({
                    logedIn: false,
                    message: 'user not exist',
                })
            }

            if (!user.isActive) {
                return res.json({
                    logedIn: false,
                    message: 'account not active',
                })
            }

            const isPasswordCorrect = await comparer(req.password, user.hash, user.iv, user.salt)

            if (!isPasswordCorrect) {
                return res.json({
                    logedIn: false,
                    message: 'incorrect password',
                })
            }

            const token = this.createToken(await this.generateToken(user))

            return res.cookie('jwt', token, {
                secure: false,
                domain: frontConfiguration.domain,
                httpOnly: true
            })
                .json({
                    logedIn: true,
                    message: user.role,
                })
        } catch (err) {
            res
                .status(500)
                .json({ error: err.message })
        }
    }
}
