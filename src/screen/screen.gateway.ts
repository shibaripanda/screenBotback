import { UseGuards } from '@nestjs/common'
import {
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets'
import { Server, Socket } from 'socket.io'
import { JwtAuthGuard } from '../auth/jwt-auth.guard'
import { ScreenService } from '../screen/screen.service'
import { BotService } from 'src/bot/bot.service'

@WebSocketGateway(
  {
      cors:{
        origin:'*'
    }
  }
)

export class ScreenGateway {

  constructor(
    private screenSevice: ScreenService,
    private botSevice: BotService
  ) {}

  
  @WebSocketServer() server: Server;

  @UseGuards(JwtAuthGuard)
  @SubscribeMessage('deleteScreen')
  async deleteScreen(client: Socket, payload: any): Promise<void> {
    await this.screenSevice.deleteScreen(payload)
  }

  // @UseGuards(JwtAuthGuard)
  // @SubscribeMessage('newScreen')
  // async newScreen(client: Socket, payload: any): Promise<void> {
    // const user = client['user']
    // await this.screenSevice.newScreen(payload)
    // const res = await this.screenSevice.getScreens(payload)
    // this.server.emit('getScreens', res)
  // }

  @UseGuards(JwtAuthGuard)
  @SubscribeMessage('createNewScreen')
  async createNewScreen(client: Socket, payload: any): Promise<void> {
    await this.screenSevice.createNewScreen(payload.botId, payload.screenName)
  }

  @UseGuards(JwtAuthGuard)
  @SubscribeMessage('getScreens')
  async getScreens(client: Socket, payload: any): Promise<void> {
    const res = await this.screenSevice.getScreens(payload)
    this.server.emit('getScreens', res)
  }

  @UseGuards(JwtAuthGuard)
  @SubscribeMessage('sendMeScreen')
  async sendMeScreen(client: Socket, payload: any): Promise<void> {
    const user = client['user']
    this.server.to(process.env.SERVER_ROOM).emit('sendMeScreen', {userId: user.id, screenId: payload.screenId, botId: payload.botId})
    console.log('sendMeScreen')
  }


}
