import {
    Module,
    MiddlewareConsumer,
    RequestMethod,
    NestModule,
} from "@nestjs/common";
import { UserController } from "./user.controller";
import { UserService } from "./user.service";
import { UtilsModule } from "src/utils/utils.module";

@Module({
    imports: [UtilsModule],
    controllers: [UserController],
    providers: [UserService],
    exports: [UserService],
})
export class UserModule { }
