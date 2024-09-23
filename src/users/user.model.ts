import * as mongoose from 'mongoose';

export const UsersSchema = new mongoose.Schema({
  id: {type: Number},
  data: {type: Object},
  activBot: {type: Object}
}, {timestamps: true})

export interface User {
   id: number,
  _id: string,
  data: object,
  activBot: object
}
