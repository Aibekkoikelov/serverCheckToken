import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import {ClientsModule, Transport} from "@nestjs/microservices";

@Module({
  controllers: [AuthController,],
  imports:[ClientsModule.register([
    {
      name: 'TOKEN',
      transport: Transport.TCP,
      options:{port:3001}
    }
  ])]
})
export class AuthModule {}
