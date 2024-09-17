import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose'

@Injectable()
export class ScreenService {

    constructor(
        @InjectModel('Screen') private botMongo: Model<Screen>) {}

        async createZeroScreen(_id: string){
            await this.botMongo.create({
                owner: _id, 
                name: 'Start screen', 
                // index: 'screen_2', 
                text: 'Hello, bot service is activated!',
                media: [],
                document: [],
                audio: [],
                buttons: [],
                protect: true
            })
        }

        async createNewScreen(botId: string, screenName: string){
            await this.botMongo.create({
                owner: botId, 
                name: screenName, 
                // index: 'screen_2', 
                text: '',
                media: [],
                document: [],
                audio: [],
                buttons: [],
                protect: true
            })
        }

        async deleteScreen(id: string){
            await this.botMongo.deleteOne({_id: id})
        }

        async getScreens(owner: string){
            const screens = await this.botMongo.find({owner: owner})
            return screens
        }

        async clearScreen(owner: string, _id: string){
            await this.botMongo.updateOne({owner: owner, _id: _id}, {text: '', media: [], document: [], audio: [], buttons: []})
        }

        async editButtons(owner: string, _id: string, buttons: []){
            await this.botMongo.updateOne({owner: owner, _id: _id}, {buttons: buttons})
        }

        async updateVariable(owner: string, _id: string, variable: string){
            await this.botMongo.updateOne({owner: owner, _id: _id}, {variable: variable})
        }

        async protectScrreen(owner: string, _id: string, status: boolean){
            await this.botMongo.updateOne({owner: owner, _id: _id}, {protect: status})
        }
}
