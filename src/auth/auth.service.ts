import { Injectable } from '@nestjs/common';
import { authLoginDto } from './dto/auth-login.dto';
import { Response } from 'express';
import { AdminEntity } from './admin.entity';
import { v4 as uuid } from 'uuid';
import { sign } from 'jsonwebtoken';
import { JwtPayload } from './jwt.strategy';
import { comparer, hasher } from './crypto';
import { frontConfiguration, safetyConfiguration } from 'config';
import { HrEntity } from 'src/hr/hr.entity';
import { findUser } from 'src/utils/find-user';

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

    private async generateToken(user: AdminEntity | HrEntity): Promise<string> {
        let token: string;
        let AdminWithThisToken = null;
        let HrWithTokne = null
        do {
            token = uuid();
            AdminWithThisToken = await AdminEntity.findOne({
                where: {
                    loggedIn: token
                }
            })
            HrWithTokne = await HrEntity.findOne({
                where: {
                    loggedIn: token
                }
            })
        } while (!!AdminWithThisToken && !!HrWithTokne);
        user.loggedIn = token;
        await user.save();

        return token;
    }

    async login(req: authLoginDto, res: Response): Promise<any> {
        try {
            const user = await findUser(req);

            if (!user) {
                return res.json({
                    logedIn: false,
                    message: 'user not exist',
                })
            }

            if (!user.activated) {
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
