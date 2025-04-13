import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AuthController } from 'src/auth/auth.controller';
import { AuthService } from 'src/auth/auth.service';
import { JwtStrategy } from 'src/auth/strategy';

@Module({
    imports: [JwtModule.register({})],
    providers: [AuthService, JwtStrategy],
    controllers: [AuthController]
})
export class AuthModule { }
