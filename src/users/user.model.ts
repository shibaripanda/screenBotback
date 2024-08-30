import * as mongoose from 'mongoose';

export const UsersSchema = new mongoose.Schema({
  id: {type: Number},
}, {timestamps: true})

export interface User {
   id: number,
  _id: string
}
