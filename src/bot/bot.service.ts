import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Bot } from './bot.model';
import { Model } from 'mongoose'

@Injectable()
export class BotService {

    constructor(
        @InjectModel('Bot') private botMongo: Model<Bot>) {}

        async getBots(id: number){
            const bots = await this.botMongo.find({owner: id}, {token: 0})
            console.log('Bots getBots: ' + bots)
            return bots
        }
}
