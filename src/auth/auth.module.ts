import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AuthController } from 'src/auth/auth.controller';
import { AuthService } from 'src/auth/auth.service';

@Module({
    imports: [JwtModule.register({})],
    providers: [AuthService],
    controllers: [AuthController]
})
export class AuthModule { }
