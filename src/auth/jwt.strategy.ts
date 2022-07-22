import { Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { UnauthorizedException, Injectable } from '@nestjs/common';
import { UserEntity } from './user.entity';
import { safetyConfiguration } from 'config';


export interface JwtPayload {
    id: string;
};

function cookieExtractor(req: any): null | string {
    return (req && req.cookies) ? (req.cookies?.jwt ?? null) : null;
}

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor() {
        super({
            jwtFromRequest: cookieExtractor,
            secretOrKey: safetyConfiguration.jwtKey
        })
    }

    async Validate(payload: JwtPayload, done: (error: UnauthorizedException | null, user: boolean | UserEntity) => void) {
        if (!payload || !payload.id) {
            return done(new UnauthorizedException(), false)
        }

        const user = await UserEntity.findOne({
            where: {
                jwt: payload.id
            }
        })

        if (!user) {
            return done(new UnauthorizedException(), false)
        }

        done(null, user)
    }
}