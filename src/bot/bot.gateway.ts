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
    const res = await this.botSevice.createBot(user.id, payload)
    this.server.emit('createNewBot', res)
    if(res === 'Bot created! ✅'){
      const bots = await this.botSevice.getBots(user.id)
      this.server.emit('getMyBots', bots)
      // this.server.to(process.env.SERVER_ROOM).emit('onBot', payload)
    } 
  }

  @UseGuards(JwtAuthGuard)
  @SubscribeMessage('createNewScreen')
  async createNewScreen(client: Socket, payload: any): Promise<void> {
    console.log(payload)
    const user = client['user']
    await this.botSevice.createNewScreen(user.id, payload.botId, payload.screenName)
    // const res = await this.screenSevice.getScreens(payload)
    // this.server.emit('getScreens', res)
  }

  @UseGuards(JwtAuthGuard)
  @SubscribeMessage('editModeBot')
  async editModeBot(client: Socket, payload: any): Promise<void> {
    const user = client['user']
    await this.botSevice.editModeBot(user.id, payload)
  }

  @UseGuards(JwtAuthGuard)
  @SubscribeMessage('getBot')
  async getBot(client: Socket, payload: any): Promise<void> {
    const user = client['user']
    const res = await this.botSevice.getBot(user.id, payload)
    this.server.emit('getBot', res)
  }

  @UseGuards(JwtAuthGuard)
  @SubscribeMessage('getMyBots')
  async getBots(client: Socket): Promise<void> {
    const user = client['user']
    const res = await this.botSevice.getBots(user.id)
    this.server.emit('getMyBots', res)
    console.log('getMyBots')
  }

  @UseGuards(JwtAuthGuard)
  @SubscribeMessage('deleteBot')
  async deleteBot(client: Socket, payload: any): Promise<void> {
    const user = client['user']
    this.server.to(process.env.SERVER_ROOM).emit('offBot', payload)
    await this.botSevice.deleteBot(user.id, payload)
    const res = await this.botSevice.getBots(user.id)
    this.server.emit('getMyBots', res)
  }

  @UseGuards(JwtAuthGuard)
  @SubscribeMessage('offBot')
  async offBot(client: Socket, payload: any): Promise<void> {
    const user = client['user']
    await this.botSevice.offBot(user.id, payload)
    const res = await this.botSevice.getBots(user.id)
    this.server.emit('getMyBots', res)
    this.server.to(process.env.SERVER_ROOM).emit('offBot', payload)
  }

  @UseGuards(JwtAuthGuard)
  @SubscribeMessage('onBot')
  async onBot(client: Socket, payload: any): Promise<void> {
    const user = client['user']
    await this.botSevice.onBot(user.id, payload)
    const res = await this.botSevice.getBots(user.id)
    this.server.emit('getMyBots', res)
    this.server.to(process.env.SERVER_ROOM).emit('onBot', payload)
  }

}
