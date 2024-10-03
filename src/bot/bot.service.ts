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

        async idForEditScreen(id: number, _id: string, screenId: string){
            await this.botMongo.updateOne({owner: id, _id: _id}, {mode: screenId})
        }
        
        async onBot(id: number, _id: string){
            await this.botMongo.updateOne({owner: id, _id: _id}, {status: true})
        }

        async deleteBot(id: number, _id: string){
            await this.botMongo.deleteOne({owner: id, _id: _id})
        }

        async updateBotInfo(bot: object){
            const testingBot = await testBot(bot['token'])
            if(testingBot){
                if(bot['name'] !== testingBot['name']){
                    await this.botMongo.updateOne({token: bot['token']}, {name: testingBot['name']})
                }
            }
            else{
                await this.botMongo.updateOne({token: bot['token']}, {status: false})
            }
        }

        async getBots(id: number){
            const botTest = await this.botMongo.find({owner: id}, {token: 1, _id: 0, name: 1})
            for(const i of botTest){
               await this.updateBotInfo(i) 
            }
            const bots = await this.botMongo.find({owner: id}, {token: 0})
            return bots
        }

        async getContent(id: number, botId: string){
            const bot = await this.botMongo.findOne({owner: id, _id: botId}, {token: 0})
            return bot.content
        }

        async getBot(id: number, botId: any){
            const botTest = await this.botMongo.findOne({owner: id, _id: botId}, {token: 1, _id: 0, name: 1})
            await this.updateBotInfo(botTest)
            const bot = await this.botMongo.findOne({owner: id, _id: botId}, {token: 0})
            return bot
        }

        async createBot(id: number, token: string){
            const bot = await this.botMongo.find({token: token})
            if(!bot.length){
                const testBotWork = await testBot(token)
                console.log('testBotWork #' , testBotWork)
                if(testBotWork){
                    const newBot = await this.botMongo.create({owner: id, token: token, status: false, mode: '', name: testBotWork.name, username: testBotWork.username})
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
