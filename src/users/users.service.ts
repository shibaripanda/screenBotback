import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'
import { User } from './user.model'

@Injectable()
export class UsersService {

    constructor(
        @InjectModel('User') private userMongo: Model<User>) {}

    async createUser(id: number){
        const user = await this.userMongo.create({id: id})
        // console.log('User createUser: ' + user)
        return user
    }

    async getUser(id: number){
        const user = await this.userMongo.findOne({id: id}, {activBot: 0})
        // console.log('User getUser: ' + user)
        return user
    }

}
