import {Provider} from "@nestjs/common";

export abstract class UsersService {

}

export class UserServiceImpl extends UsersService {

}

export const UserServiceProvider: Provider = {
    provide: UsersService,
    useClass: UserServiceImpl,
}