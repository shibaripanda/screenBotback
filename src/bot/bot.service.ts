import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Bot } from './bot.model';
import { Model } from 'mongoose'
import { testBot } from '../modules/testBot'

@Injectable()
export class BotService {

    constructor(
        @InjectModel('Bot') private botMongo: Model<Bot>) {}

        async getBots(id: number){
            const bots = await this.botMongo.find({owner: id}, {token: 0})
            // console.log('Bots getBots: ' + bots)
            return bots
        }

        async createBot(id: number, token: string){
            const bot = await this.botMongo.find({token: token})
            if(!bot.length){
                const testBotWork = await testBot(token)
                if(testBotWork){
                    await this.botMongo.create({owner: id, token: token, status: true})
                    return 'Bot created! ✅'
                }
                else{
                    return 'Invalid bot token! ❌'
                }
            }
            return 'Bot in use! ⚠️'
        }
}
