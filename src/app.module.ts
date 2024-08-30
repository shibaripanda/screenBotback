import { Module } from '@nestjs/common';
// import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { AppGateway } from './app.gateway';

@Module({
  imports: [
    MongooseModule.forRoot(process.env.MONGO_TOKEN), 
    AuthModule, 
    UsersModule
  ],
  // controllers: [AppController],
  providers: [AppService, AppGateway],
})
export class AppModule {}
