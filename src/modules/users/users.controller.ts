import {Body, Controller, Get, Post} from "@nestjs/common";
import {CreateUserDto} from "./models/dto/create-user.dto";
import {ApiResponse, ApiTags} from "@nestjs/swagger";
import {CreateUserResponseDto} from "./models/dto/create-user-response.dto";
import {Response} from "./models/dto/response.dto";

@ApiTags('users')
@Controller()
export class UsersController {
    @ApiResponse({
        type: Response<CreateUserResponseDto>,
    })
    @Post('/create')
    async create(@Body() userResponse: CreateUserDto) {
        return Response.success<CreateUserResponseDto>({
            id: userResponse.efficiency
        })
    }
}