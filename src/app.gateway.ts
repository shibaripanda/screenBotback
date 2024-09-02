import { Request, UseGuards } from '@nestjs/common';
import {
  OnGatewayConnection,
  OnGatewayDisconnect,
  OnGatewayInit,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { AppService } from 'src/app.service';
import { JwtAuthGuard } from './auth/jwt-auth.guard';
// import { CreateMessDto } from 'src/dto/create-mess.dto';

@WebSocketGateway(
  {
      cors:{
        origin:'*'
    }
  }
)

export class AppGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {

  constructor(private appService: AppService) {}

  
  @WebSocketServer() server: Server;
  // @UseGuards(JwtAuthGuard)
  @SubscribeMessage('send')
  async handleSendMessage(client: Socket, payload: any): Promise<void> {
    console.log('send ', payload)
    // console.log(req.user)
    // console.log(client.handshake.auth.token)
    // await this.appService.createMessage(payload);
    // const all = (await this.appService.getMessage()).reverse().map(item => item.text)
    this.server.emit('res', 'связь прошла')
  }

  afterInit(server: any) {
    console.log('server')
  }
  handleConnection(client: Socket) {
    console.log('connect')
  }
  handleDisconnect(client: Socket) {
    console.log('dicconnect')
  }
}
