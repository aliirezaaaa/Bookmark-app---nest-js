import { ForbiddenException, Injectable } from "@nestjs/common";
import { AuthDto } from "src/auth/dto";
import { PrismaService } from "src/prisma/prisma.service";
import * as argon from 'argon2'
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
@Injectable({})
export class AuthService {
    constructor(private prismaService: PrismaService) { }

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

    signIn() {
        return { msg: 'This is signIn!' }
    }
}