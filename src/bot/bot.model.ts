import * as mongoose from 'mongoose';

export const BotSchema = new mongoose.Schema({
  botId: {type: Number},
  owner: {type: Number},
  token: {type: String},
  status: {type: Boolean, default: false}
}, {timestamps: true})

export interface Bot {
   id: number,
  _id: string,
  owner: string,
  token: string
}
