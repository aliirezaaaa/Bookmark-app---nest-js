import { Body, Controller, Post } from "@nestjs/common";
import { AuthService } from "../auth/auth.service";
import { AuthDto } from "../auth/dto";

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) { }

    @Post('signup')
    signUp(@Body() authDto: AuthDto) {
        return this.authService.signUp(authDto)
    }

    @Post('signin')
    signIn(@Body() authDto: AuthDto) {
        return this.authService.signIn(authDto)
    }
}