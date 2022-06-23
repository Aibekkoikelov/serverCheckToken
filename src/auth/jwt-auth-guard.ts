import {CACHE_MANAGER, CanActivate, ExecutionContext, Inject, Injectable, UnauthorizedException} from "@nestjs/common";
import {Observable} from "rxjs";
import {Cache} from "cache-manager";
@Injectable()
export class JwtAuthGuard implements CanActivate{
    constructor(@Inject(CACHE_MANAGER) private cacheManager: Cache) {}
    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {

try{
    const request = context.switchToHttp().getRequest()
    const token = request.headers.authorization.split(" ")[1]
    if (!token){
        return false
    }
    const checkToken = async (token: string):Promise<boolean> =>{

        const oldCache = await  this.cacheManager.get(token);
        console.log(oldCache)
        if(!oldCache){
            const newToken = token // abstract service
            await this.cacheManager.set(newToken, newToken , {ttl: 300})
            return true
        }
        return true
    }
   return  checkToken(token)

}
catch (e){
    throw new UnauthorizedException({message:"Пользователь не авторизован"})
}
    }
}

