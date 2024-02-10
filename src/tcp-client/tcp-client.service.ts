import { Injectable } from '@nestjs/common';
import { createConnection } from 'net';
import { Subject } from 'rxjs';

@Injectable()
export class TcpClientService {
  private weightUpdatesSubject: Subject<number> = new Subject<number>();

  constructor() {
    const TCP_SERVER_IP = '127.0.0.1'; // Replace with your TCP server IP address
    const TCP_SERVER_PORT = 3002;

    const tcpClient = createConnection({ host: TCP_SERVER_IP, port: TCP_SERVER_PORT }, () => {
      console.log('Connected to TCP server');
    });

    tcpClient.on('data', data => {
      const weight = parseFloat(data.toString().trim());
      console.log('Received weight from TCP server:', weight);
      this.weightUpdatesSubject.next(weight);
    });

    tcpClient.on('end', () => {
      console.log('Disconnected from TCP server');
    });

    tcpClient.on('error', err => {
        console.error('TCP client error:', err);
    });
  }

  subscribeToWeightUpdates(callback: (weight: number) => void) {
    this.weightUpdatesSubject.subscribe(callback);
  }
}
