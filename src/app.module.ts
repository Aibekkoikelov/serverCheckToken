import {CacheInterceptor, CacheModule, Module} from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { UserModule } from './user/user.module';
import { AuthService } from './auth/auth.service';
import { AuthModule } from './auth/auth.module';
import {APP_INTERCEPTOR} from "@nestjs/core";
import {JwtAuthGuard} from "./auth/jwt-auth-guard";
@Module({
  imports: [CacheModule.register(),ConfigModule.forRoot({
    envFilePath: '.development.env'
  }), UserModule, AuthModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
