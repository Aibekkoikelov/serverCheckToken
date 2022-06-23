import {Body, Controller, Get, Param, Post, UseGuards, UseInterceptors} from '@nestjs/common';
import {CreateUserDto} from "./dto/CreateUser.dto";
import {JwtAuthGuard} from "../auth/jwt-auth-guard";
import {UserService} from "./user.service";
@Controller('user')
export class UserController {
  constructor(private userService: UserService){}
    @Post()
    createUser(@Body() dto: CreateUserDto){
        return "Hello friend"
    }
    @UseGuards(JwtAuthGuard)
    @Get()
    getAllUser(){
        return "get All user"
    }
    @UseGuards(JwtAuthGuard)
    @Get('/:id')
    getUserById(@Param('id') id: number){
        return 'User'
    }

}
