import { Injectable } from "@nestjs/common";
import { AuthDto } from "src/auth/dto";
import { PrismaService } from "src/prisma/prisma.service";

@Injectable({})
export class AuthService {
    constructor(private prismaService: PrismaService) { }


    signUp(authDto: AuthDto) {
        return { msg: authDto }
    }

    signIn() {
        return { msg: 'This is signIn!' }
    }
}