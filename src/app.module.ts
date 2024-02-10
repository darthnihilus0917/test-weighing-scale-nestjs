import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TcpClientService } from './tcp-client/tcp-client.service';
import { AppGateway } from './app/app.gateway';

@Module({
  imports: [],
  controllers: [AppController],
  providers: [AppService, TcpClientService, AppGateway],
})
export class AppModule {}
