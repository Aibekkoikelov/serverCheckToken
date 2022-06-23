import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import {JwtAuthGuard} from "./auth/jwt-auth-guard";

const start = async () =>{

  try{
    const PORT = process.env.PORT || 5000
    const app = await NestFactory.create(AppModule)  // создаем серверную часть
    await app.listen(PORT, () => console.log(`Server work on port number ${PORT}`))

  }catch (e){
    console.log(e)
  }
}

start()
