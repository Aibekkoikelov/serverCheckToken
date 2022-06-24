import {CacheModule, Module} from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import {ClientsModule, Transport} from "@nestjs/microservices";

@Module({
  imports:[CacheModule.register(),ClientsModule.register([
    {
      name: 'TOKEN',
      transport: Transport.TCP,
      options:{port:3001}
    }
  ]) ],
  controllers: [UserController],
  providers: [UserService,]
})
export class UserModule {}
