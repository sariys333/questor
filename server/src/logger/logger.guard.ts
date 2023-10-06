import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { generateSecret } from 'jose';
import { Observable } from 'rxjs';

@Injectable()
export class LoggerGuard implements CanActivate {
  
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    
    const secretKey = generateSecret("HS256");
    const request = context.switchToHttp().getRequest()
    const token = request.headers.authorization

    console.log("Logger Guard")
    console.log(token)

    return true;
  }
}
