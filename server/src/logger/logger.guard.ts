import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';

@Injectable()
export class LoggerGuard implements CanActivate {
  
  async canActivate(
	context: ExecutionContext,
		): Promise<boolean> {

			const request = context.switchToHttp().getRequest()
			const cookie = request.headers.cookie
			console.log(cookie)


		return true;
	}
}
