import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose'

@Injectable()
export class ScreenService {

    constructor(
        @InjectModel('Screen') private botMongo: Model<Screen>) {}

        async createZeroScreen(_id: string){
            const res = await this.botMongo.create({
                owner: _id, 
                name: 'Start screen2', 
                index: 'screen_2', 
                text: 'screen_2',
                media: [],
                document: [],
                audio: [],
                buttons: [[ {text: 'Link', to: 'google.com', action: 'url'}],
                         [ {text: 'Link1', to: 'google.com', action: 'url'}]],
                protect: true
            })
            const res1 = await this.botMongo.create({
                owner: _id, 
                name: 'Start screen1', 
                index: 'screen_1', 
                text: 'screen_1',
                media: [],
                document: [],
                audio: [],
                buttons: [[{text: 'Hello', to: res._id, action: 'callback'}],
                         [{text: 'Hello1', to: res._id, action: 'callback'}, {text: 'Link1', to: 'google.com', action: 'url'}]],
                protect: true
            })
            await this.botMongo.create({
                owner: _id, 
                name: 'Start screen0', 
                index: 'screen_0', 
                text: 'Welcom screen! Bot is Active!',
                media: [],
                document: [],
                audio: [],
                buttons: [[{text: 'Hello', to: res._id, action: 'callback'}, {text: 'Link', to: 'google.com', action: 'url'}],
                         [{text: 'Hello1', to: res1._id, action: 'callback'}]],
                protect: true
            })
        }

        async newScreen(data: any){
            console.log(data)
            // await this.botMongo.create({owner: botId, name: 'Start screen1', index: 'screen_1', text: 'Welcom screen! Bot is Active!'})
        }

        async deleteScreen(id: string){
            await this.botMongo.deleteOne({_id: id})
        }

        async getScreens(owner: string){
            const screens = await this.botMongo.find({owner: owner})
            return screens
        }
}