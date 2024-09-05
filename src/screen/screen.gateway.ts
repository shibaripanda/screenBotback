import { UseGuards } from '@nestjs/common'
import {
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets'
import { Server, Socket } from 'socket.io'
import { JwtAuthGuard } from '../auth/jwt-auth.guard'
import { ScreenService } from '../screen/screen.service'

@WebSocketGateway(
  {
      cors:{
        origin:'*'
    }
  }
)

export class ScreenGateway {

  constructor(
    private screenSevice: ScreenService
  ) {}

  
  @WebSocketServer() server: Server;

  @UseGuards(JwtAuthGuard)
  @SubscribeMessage('createNewScreen')
  async createNewBot(client: Socket, payload: any): Promise<void> {
    const user = client['user']
    const res = await this.screenSevice.createScreen(user.id, payload)
    this.server.emit('createNewBot', res)
    // if(res === 'Bot created! ✅'){
    //   const bots = await this.screenSevice.getScreens(user.id)
    //   this.server.emit('getMyBots', bots)
    // } 
  }

  @UseGuards(JwtAuthGuard)
  @SubscribeMessage('getScreens')
  async getBot(client: Socket, payload: any): Promise<void> {
    // const user = client['user']
    const res = await this.screenSevice.getScreens(payload)
    this.server.emit('getScreens', res)
  }



}
