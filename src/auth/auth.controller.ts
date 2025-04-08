import { Body, Controller, Post } from "@nestjs/common";
import { AuthService } from "src/auth/auth.service";
import { AuthDto } from "src/auth/dto";

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) { }

    @Post('signup')
    signUp(@Body() authDto: AuthDto) {
        return this.authService.signUp(authDto)
    }

    @Post('signin')
    signIn() {
        return this.authService.signIn()
    }
}