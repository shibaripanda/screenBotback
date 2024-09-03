import { forwardRef, Module } from '@nestjs/common';
import { BotController } from './bot.controller';
import { BotService } from './bot.service';
import { MongooseModule } from '@nestjs/mongoose';
import { BotSchema } from './bot.model';
import { AuthModule } from 'src/auth/auth.module';
import { BotGateway } from './bot.gateway';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'Bot', schema: BotSchema }]), forwardRef(() => AuthModule)],
  controllers: [BotController],
  providers: [BotService, BotGateway],
  exports: [BotService]
})
export class BotModule {}
