import {Body, Controller, Get, Post} from "@nestjs/common";
import {CreateUserDto} from "./models/dto/create-user.dto";

@Controller()
export class UsersController {
    @Post('/create')
    async create(@Body() userResponse: CreateUserDto) {
        return []
    }
}