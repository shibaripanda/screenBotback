import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from './user.model';
// import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UsersService {

    constructor(
        @InjectModel('User') private userModelNestreact: Model<User>) {}

    async createUser(id){
        const user = await this.userModelNestreact.create({id: Number(id)})
        // console.log('User createUser: ' + user)
        return user
    }

    async getUser(id){
        const user = await this.userModelNestreact.findOne({id: Number(id)}, {activBot: 0})
        // console.log('User getUser: ' + user)
        return user
    }

    // async updateUser(id: any, dto: any){
    //     await this.userModelNestreact.updateOne({_id: id}, dto)
    // }

}
