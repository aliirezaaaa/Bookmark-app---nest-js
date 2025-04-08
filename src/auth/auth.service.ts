import { Injectable } from "@nestjs/common";

@Injectable({})
export class AuthService {

    signIn() {
        return { msg: 'This is signIn!' }
    }

    signUp() {
        return { msg: 'This is signUp!' }
    }
}