import {Body, Controller, Delete, Get, Param, Patch, Post, Query} from "@nestjs/common";
import {CreateUserDto} from "./models/dto/create-user.dto";
import {ApiParam, ApiQuery, ApiResponse, ApiTags} from "@nestjs/swagger";
import {CreateUserResponseDto} from "./models/dto/create-user-response.dto";
import {Response} from "./models/dto/response.dto";
import {UpdateUserDto} from "./models/dto/update-user.dto";
import {UsersService} from "./users.service";

@ApiTags('users')
@Controller()
export class UsersController {
    constructor(
        private readonly userService: UsersService
    ) {}

    @ApiResponse({
        type: Response<CreateUserResponseDto>,
    })
    @Post('/create')
    async create(@Body() userResponse: CreateUserDto) {
        try {
            const newUserId = await this.userService.create(userResponse);

            return Response.success<CreateUserResponseDto>({
                id: newUserId
            })
        } catch (e) {
            return Response.error('Не удалось сохранить пользователя')
        }
    }

    @ApiResponse({
        type: Response<CreateUserResponseDto>,
    })
    @Get('/get/:id')
    async getById(@Param('id') userId: number) {
        try {
            const user = await this.userService.getById(userId);

            if(!user) {
                return Response.error(`Пользователь с id ${userId} не найден`)
            }

            return Response.success({
                users: [user]
            })
        } catch (e) {
            return Response.error(`Не удалось получить пользователя с id ${userId}`)
        }
    }

    @ApiResponse({
        type: [String],
    })
    @ApiQuery({ name: 'full_name', required: false })
    @ApiQuery({ name: 'role', required: false })
    @Get('/get')
    async getByFilter(
        @Query('full_name') fullname: string,
        @Query('role') role: string
    ) {
        try {
            if(fullname == null && role == null) {
                const allUsers = await this.userService.getAll();
                return Response.success({
                    users: allUsers
                })
            }

            const filtredUsers = await this.userService.getByFilter({ fullname, role });
            if(filtredUsers?.length) {
                return Response.success({
                    users: filtredUsers
                })
            }

            return Response.error(`Не удалось получить пользователей по указанным фильтрам`);
        } catch (e) {
            return Response.error(`Не удалось получить пользователей по указанным фильтрам`);
        }
    }

    @Patch('/update/:id')
    async updateUser(@Param('id') id: number, @Body() updateUser: UpdateUserDto) {
        try {
            const updatedUser = await this.userService.update(id, updateUser);

            return Response.success(updatedUser);
        } catch (e) {
            return Response.error(`Не удалось обновить пользователя`);
        }
    }

    @ApiParam({ name: 'id', required: false })
    @Delete('/delete/:id')
    async delete(@Param('id') id: number) {
        try {
            if(!id) {
                await this.userService.deleteAll();
                return Response.success();
            }

            const deletedUser = await this.userService.delete(id);
            return Response.success(deletedUser);
        } catch (e) {
            return Response.error(`Не удалось удалить пользователя`);
        }
    }
}