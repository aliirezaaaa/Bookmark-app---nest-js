import { ForbiddenException, Injectable } from "@nestjs/common";
import { AuthDto } from "src/auth/dto";
import { PrismaService } from "src/prisma/prisma.service";
import * as argon from 'argon2'
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import { JwtService } from "@nestjs/jwt";
import { ConfigService } from "@nestjs/config";
@Injectable({})
export class AuthService {
    constructor(
        private prismaService: PrismaService,
        private jwtService: JwtService,
        private configService: ConfigService
    ) { }

    async signUp(authDto: AuthDto) {
        const hashPassword = await argon.hash(authDto.password)
        try {
            const user = await this.prismaService.user.create({
                data: {
                    email: authDto.email,
                    hashPassword: hashPassword
                }
            })
            delete user.hashPassword
            return user
        } catch (error) {
            if (error instanceof PrismaClientKnownRequestError) {
                if (error.code === 'P2002') {
                    throw new ForbiddenException('Credentials taken!')
                }
            }
            throw error
        }
    }

    async signIn(authDto: AuthDto) {
        const user = await this.prismaService.user.findFirst({
            where: { email: authDto.email }
        })

        if (!user) {
            throw new ForbiddenException('Credentials incorrect!')
        }

        const passwordMatch = await argon.verify(user.hashPassword, authDto.password)


        if (!passwordMatch) {
            throw new ForbiddenException('Credentials incorrect!')
        }

        return this.signUpToken(user.id, user.email)
    }

    async signUpToken(id: number, email: string): Promise<{ accessToken: string }> {
        const payload = {
            sub: id,
            email
        }

        const accessToken = await this.jwtService.signAsync(payload, {
            expiresIn: '15m',
            secret: this.configService.get('JWT_SERVICE')
        })

        return { accessToken }
    }
}