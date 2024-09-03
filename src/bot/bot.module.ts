import { forwardRef, Module } from '@nestjs/common';
import { BotController } from './bot.controller';
import { BotService } from './bot.service';
import { MongooseModule } from '@nestjs/mongoose';
import { BotSchema } from './bot.model';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'Bot', schema: BotSchema }]), forwardRef(() => AuthModule)],
  controllers: [BotController],
  providers: [BotService],
  exports: [BotService]
})
export class BotModule {}
