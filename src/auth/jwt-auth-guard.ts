import {CACHE_MANAGER, CanActivate, ExecutionContext, Inject, Injectable, UnauthorizedException} from "@nestjs/common";
import {firstValueFrom,  Observable, } from "rxjs";

import {Cache} from "cache-manager";
import {ClientProxy} from "@nestjs/microservices";



@Injectable()
export class JwtAuthGuard implements CanActivate{
    constructor(@Inject("TOKEN")private tokenClient: ClientProxy,@Inject(CACHE_MANAGER) private cacheManager: Cache ) {}
    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {

try{
    const request = context.switchToHttp().getRequest()
    const token = request.headers.authorization.split(" ")[1]
    if (!token){
        return false
    }
    const checkToken = async (token: string):Promise<boolean> => {
        console.log(token)
        const oldCache = await  this.cacheManager.get(token);
        if(!oldCache){
            let newToken = await tokenService(token)// abstract service
            console.log(oldCache)
            if (!newToken){
                return false
            }
            await this.cacheManager.set(`${newToken}`, newToken , {ttl: 300})
            return true
        }
        return true
    }
    const tokenService = async (token:string)=>{
        this.tokenClient.emit("create-token", token);
        const newToken = await this.tokenClient.send({cmd:"newToken"}, '')
         const  data = await firstValueFrom(newToken)
         return data

    }
   return  checkToken(token)
}
catch (e){
    throw new UnauthorizedException({message:"Пользователь не авторизован"})
}
    }
}

