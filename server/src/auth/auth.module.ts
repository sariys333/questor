import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UserModule } from 'src/user/user.module';
import { SECRET_KEY } from 'src/Constants';
import { JwtModule } from '@nestjs/jwt'
import { APP_GUARD } from '@nestjs/core';
import { AuthGuard } from './auth.guard';

@Module({
	imports: [
		UserModule,
		JwtModule.register({
			global: true,
			secret: SECRET_KEY,
			signOptions: { expiresIn: '60s' },
		}),
	],
	controllers: [AuthController],
	providers: [AuthService, {
		provide: APP_GUARD,
		useClass: AuthGuard,
	}],
	exports: [AuthService],
})
export class AuthModule { }
