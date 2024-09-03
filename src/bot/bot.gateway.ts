import { UseGuards } from '@nestjs/common'
import {
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets'
import { Server, Socket } from 'socket.io'
import { JwtAuthGuard } from '../auth/jwt-auth.guard'
import { BotService } from '../bot/bot.service'

@WebSocketGateway(
  {
      cors:{
        origin:'*'
    }
  }
)

export class BotGateway {

  constructor(
    private botSevice: BotService
  ) {}

  
  @WebSocketServer() server: Server;

  @UseGuards(JwtAuthGuard)
  @SubscribeMessage('createNewBot')
  async createNewBot(client: Socket, payload: any): Promise<void> {
    const user = client['user']
    console.log('createNewBot ', payload)
    console.log(user)
    const res = await this.botSevice.createBot(user.id, payload.token)
    this.server.emit('createNewBot', res)
  }

  @UseGuards(JwtAuthGuard)
  @SubscribeMessage('getMyBots')
  async getBots(client: Socket, payload: any): Promise<void> {
    const user = client['user']
    console.log('getMyBots ', payload)
    console.log(user)
    const res = await this.botSevice.getBots(user.id)
    this.server.emit('getMyBots', res)
  }

}
