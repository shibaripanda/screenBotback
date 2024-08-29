import { HttpException, HttpStatus, Injectable, UnauthorizedException } from '@nestjs/common'
import { AuthDataValidator } from '@telegram-auth/server'
import { urlStrToAuthDataMap } from '@telegram-auth/server/utils'
import { JwtService } from '@nestjs/jwt'
import { UsersService } from 'src/users/users.service'
// import { CreateUserDto } from 'src/users/dto/create-user.dto'

@Injectable()
export class AuthService {

    constructor(
        private usersService: UsersService,
        private jwtService: JwtService){}
    
    async login(data: any){
        const res = await this.telegramAuth(data)
        if(res){
            let user = await this.usersService.getUser(res.id)
            if(!user){
                user = await this.usersService.createUser(res.id)
            }
            if(user){
               return this.generateToken(user) 
            }
            console.log(user)
            throw new HttpException('Что-то пошло не так, попробуйте еще раз', HttpStatus.BAD_REQUEST)
        }
        else{
            throw new UnauthorizedException({message: 'Нет авторизации'})
        }
    }

    private async generateToken(user){
        const payload = {id: user.id, _id: user._id}
        return {
            token: this.jwtService.sign(payload)
        }
    }

    async telegramAuth(data: any){
        const validator = new AuthDataValidator({ botToken: process.env.BOT_TOKEN })
        let dataCheck: string = '/aut/login?'
        for (const key in data) {
            dataCheck = dataCheck + key + '=' + data[key] + '&'
        }
        const dataAuth = urlStrToAuthDataMap('http://localhost' + dataCheck)
        try{
            const user = await validator.validate(dataAuth)
            return user
        }
        catch(error) {
            throw new UnauthorizedException({message: 'Нет авторизации'})
        }
    }
}