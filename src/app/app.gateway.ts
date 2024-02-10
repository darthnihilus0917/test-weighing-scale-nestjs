import { WebSocketGateway, WebSocketServer, OnGatewayConnection, OnGatewayDisconnect } from '@nestjs/websockets';
import { Server, WebSocket } from 'ws';
import { Injectable } from '@nestjs/common';
import { TcpClientService } from 'src/tcp-client/tcp-client.service';

const WS_PORT = 3001

@WebSocketGateway(WS_PORT)
@Injectable()
export class AppGateway implements OnGatewayConnection, OnGatewayDisconnect {
  constructor(private readonly tcpClientService: TcpClientService) {}

  @WebSocketServer() server: Server;

  handleConnection(client: WebSocket) {
    console.log('WebSocket client connected');

    this.tcpClientService.subscribeToWeightUpdates(weight => {
      client.send(weight.toFixed(2));
    });

    client.on('close', () => {
      console.log('WebSocket client disconnected');
    });
  }

  handleDisconnect(client: WebSocket) {
    console.log('WebSocket client disconnected');
  }
}

