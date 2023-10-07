import { Injectable, NestMiddleware } from '@nestjs/common';
import { SECRET_KEY } from 'src/Constants';
import * as jose from 'jose';

@Injectable()
export class UserMiddleware implements NestMiddleware {
	async use(req: any, res: any, next: () => void) {

		const secret = await SECRET_KEY

		const jwt = await new jose.SignJWT({ "login": true })
			.setProtectedHeader({ alg: 'HS256' })
			.setIssuer(req.body.email)
			.sign(secret)

		console.log(jwt)

		
		

		next();
	}
}
