import { Module } from "@nestjs/common";
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";
import { UserModule } from "src/user/user.module";
import { SECRET_KEY } from "src/Constants";
import { JwtModule } from "@nestjs/jwt";
import { APP_GUARD } from "@nestjs/core";
import { UtilsModule } from "src/utils/utils.module";
import { AccessTokenGuard } from "src/guards/access-token/access-token.guard";

@Module({
  imports: [
    UserModule,
    JwtModule.register({
      global: true,
      secret: SECRET_KEY,
      signOptions: { expiresIn: "30m" },
    }),
    UtilsModule,
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    {
      provide: APP_GUARD,
      useClass: AccessTokenGuard,
    },
  ],
  exports: [AuthService],
})
export class AuthModule {}
