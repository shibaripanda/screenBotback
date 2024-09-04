import { forwardRef, Module } from '@nestjs/common';
import { ScreenController } from './screen.controller';
import { ScreenService } from './screen.service';
import { MongooseModule } from '@nestjs/mongoose';
import { ScreenSchema } from './screen.model';
import { AuthModule } from 'src/auth/auth.module';
import { ScreenGateway } from './screen.gateway';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'Screen', schema: ScreenSchema }]), forwardRef(() => AuthModule)],
  controllers: [ScreenController],
  providers: [ScreenService, ScreenGateway],
  exports: [ScreenService]
})
export class ScreenModule {}
