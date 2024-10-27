import {Body, Controller, Delete, Get, Param, Patch, Post, Query} from "@nestjs/common";
import {CreateUserDto} from "./models/dto/create-user.dto";
import {ApiParam, ApiQuery, ApiResponse, ApiTags} from "@nestjs/swagger";
import {CreateUserResponseDto} from "./models/dto/create-user-response.dto";
import {Response} from "./models/dto/response.dto";
import {UpdateUserDto} from "./models/dto/update-user.dto";

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

    @ApiResponse({
        type: [Number],
    })
    @Get('/get/:id')
    getById(@Param('id') userId: number) {
        return [userId];
    }

    @ApiResponse({
        type: [String],
    })
    @ApiQuery({ name: 'full_name', required: false })
    @ApiQuery({ name: 'role', required: false })
    @Get('/get')
    getByFilter(
        @Query('full_name') fullname: string,
        @Query('role') role: string
    ) {
        if(fullname == null && role == null) {
            return ['Все'];
        }

        return ['Фильтрация'];
    }

    @Patch('/update/:id')
    updateUser(@Param('id') id: number, @Body() updateUser: UpdateUserDto) {
        return {
            id, updateUser
        }
    }

    @ApiParam({ name: 'id', required: false })
    @Delete('/delete/:id')
    delete(@Param('id') id: number) {
        if(!id) {
            return 'Удаляем всех'
        }

        return 'Удаляем ' + id;
    }
}