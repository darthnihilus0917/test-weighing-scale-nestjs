import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
// import { TcpClientService } from './tcp-client/tcp-client.service';
import { AppGateway } from './app/app.gateway';
import { WeigherService } from './weigher/weigher.service';

@Module({
  imports: [],
  controllers: [AppController],
  providers: [AppService, AppGateway, WeigherService],
})
export class AppModule {}
