import { Injectable } from '@nestjs/common';
import { authLoginDto } from './dto/auth-login.dto';
import { Response } from 'express';
import { UserEntity } from './user.entity';
import { v4 as uuid } from 'uuid';
import { sign } from 'jsonwebtoken';
import { JwtPayload } from './jwt.strategy';
import { comparer, hasher } from './crypto';
import { frontConfiguration, safetyConfiguration } from 'config';
import { RegistrationData } from './dto/registration.dto';
import { randomSigns } from 'src/utils/random-signs';


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
                    message: 'Użytkownik o podanej nazwie nie istnieje',
                })
            }

            if (!user.isActive) {
                return res.json({
                    logedIn: false,
                    message: 'Konto nie jest jeszcze aktywne',
                })
            }

            const isPasswordCorrect = await comparer(req.password, user.hash, user.iv, user.salt)

            if (!isPasswordCorrect) {
                return res.json({
                    logedIn: false,
                    message: 'Niepoprawne hasło',
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

    async register(data: RegistrationData, res: Response): Promise<any> {
        try {
            const result = await UserEntity.findOne({
                where: {
                    email: data.email
                }
            })

            if (!result) {
                return res.json({
                    actionStatus: false,
                    message: 'Użytkownik o podanym adresie email nie istnieje',
                })
            }

            if (result.link !== data.urlCode) {
                return res.json({
                    actionStatus: false,
                    message: 'niepoprawny kod aktywacyjny',
                })
            }

            if (data.password.length < 8) {
                return res.json({
                    actionStatus: false,
                    message: 'Hasło jest za krótkie',
                })
            }

            result.link = null;
            result.isActive = true;

            const salt = randomSigns(safetyConfiguration.saltLength)
            const code = await hasher(data.password, salt);

            result.salt = salt;
            result.hash = code.coded;
            result.iv = code.iv;

            await result.save();

            res.json({
                actionStatus: true,
                message: 'Konto zostało aktywowane',
            })
        } catch (err) {
            console.log(err)
            res
                .status(500)
                .json({
                    actionStatus: false,
                    message: 'Błąd serwera',
                })
        }
    }
}
