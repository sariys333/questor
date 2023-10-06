import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { verify } from 'crypto';
import { generateSecret, jwtVerify } from 'jose';
import { Observable } from 'rxjs';

@Injectable()
export class LoggerGuard implements CanActivate {
  
  async canActivate(
	context: ExecutionContext,
		): Promise<boolean> {
		console.log("Logger Guard")

		const secretKey = await generateSecret("HS256");
		const request = context.switchToHttp().getRequest()
		const cookie = request.headers.cookie
		console.log(cookie)

		if(cookie) {
			const index = cookie.indexOf('=')
			console.log(index)
			if(index == 5) {
				const token = cookie.substring(index + 1)
				console.log(token)
				try {
					const payload = jwtVerify(token, secretKey)
					return true;
				} catch(error) {
					console.error(error)
					return true;
				}
			} 
		}

		return true;
	}
}
