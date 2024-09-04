import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose'

@Injectable()
export class ScreenService {

    constructor(
        @InjectModel('Screen') private botMongo: Model<Screen>) {}

        async createZeroScreen(_id: string){
            await this.botMongo.create({owner: _id, name: 'Start screen', index: 'screen_0', text: 'Welcom screen! Bot is Active!'})
        }

        async createScreen(_id: string, id: number){
            await this.botMongo.create({owner: _id, id: id})
        }
}
