import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Bot } from './bot.model';
import { Model } from 'mongoose'
import { testBot } from '../modules/testBot'
import { ScreenService } from 'src/screen/screen.service';

@Injectable()
export class BotService {

    constructor(
        @InjectModel('Bot') private botMongo: Model<Bot>,
        private screenService: ScreenService) {}

        async offBot(id: number, _id: string){
            await this.botMongo.updateOne({owner: id, _id: _id}, {status: false})
        }

        async nameForNewScreen(id: number, _id: string, screenName: string){
            await this.botMongo.updateOne({owner: id, _id: _id}, {mode: screenName})
        }
        
        // async editModeBot(id: number, _id: string){
        //     await this.botMongo.updateOne({owner: id, _id: _id}, {mode: 'edit'})
        // }

        async onBot(id: number, _id: string){
            await this.botMongo.updateOne({owner: id, _id: _id}, {status: true})
        }

        async deleteBot(id: number, _id: string){
            await this.botMongo.deleteOne({owner: id, _id: _id})
        }

        async getBots(id: number){
            const bots = await this.botMongo.find({owner: id}, {token: 0})
            // console.log('Bots getBots: ' + bots)
            return bots
        }

        async getBot(id: number, botId: any){
            const bot = await this.botMongo.findOne({owner: id, _id: botId}, {token: 0})
            // console.log('Bots getBots: ' + bots)
            return bot
        }

        async createBot(id: number, token: string){
            const bot = await this.botMongo.find({token: token})
            if(!bot.length){
                const testBotWork = await testBot(token)
                console.log('testBotWork #' , testBotWork)
                if(testBotWork){
                    const newBot = await this.botMongo.create({owner: id, token: token, status: false, mode: 'work', name: testBotWork.name, username: testBotWork.username})
                    await this.screenService.createZeroScreen(newBot._id)
                    return 'Bot created! ✅'
                }
                else{
                    return 'Invalid bot token! ❌'
                }
            }
            return 'Bot in use! ⚠️'
        }
}
