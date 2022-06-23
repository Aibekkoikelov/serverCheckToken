import {Body, CACHE_MANAGER, Controller, Inject, Post} from '@nestjs/common';
import {CreateUserDto} from "../user/dto/CreateUser.dto";

@Controller('auth')
export class AuthController {



    @Post('/login')
    login(@Body() dto: CreateUserDto){

    }
    @Post('/registration')
    registration(@Body() dto: CreateUserDto){

    }

}
