import { Body, Controller, Post } from '@nestjs/common'
import { AuthService } from './auth.service'

@Controller('/auth')
export class AuthController {

    constructor(private authService: AuthService) {}

    @Post('/login')
    login(@Body() data: any){
        // console.log('login', data)
        return this.authService.login(data)
    }
}
