import { Injectable, CanActivate, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { safetyConfiguration } from 'config';
import { verify } from 'jsonwebtoken';
import { UserEntity } from 'src/auth/user.entity';
import { DecodedToken } from 'src/types';


@Injectable()
export class AuthGuard implements CanActivate {
    async canActivate(
        context: ExecutionContext,
    ): Promise<any> {

        const jwt = context.switchToHttp().getRequest().cookies.jwt;

        if (!jwt) {
            throw new UnauthorizedException()
        }

        const decoded = verify(jwt.accesToken, safetyConfiguration.jwtKey) as DecodedToken

        const result = await UserEntity.findOne({
            where: {
                jwt: decoded.id
            }
        })

        if (!result) {
            throw new UnauthorizedException()
        }

        return true;
    }
}