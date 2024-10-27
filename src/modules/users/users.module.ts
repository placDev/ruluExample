import {Module} from "@nestjs/common";
import {UsersController} from "./users.controller";
import {UserServiceProvider} from "./users.service";

@Module({
    controllers: [UsersController],
    providers: [UserServiceProvider]
})
export class UsersModule {}