import {
    Body,
    Controller,
    Delete,
    Get,
    InternalServerErrorException,
    NotFoundException,
    Param,
    Patch,
    Post,
    Query,
    Res
} from "@nestjs/common";
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
            throw new InternalServerErrorException(
                Response.error('Не удалось сохранить пользователя')
            );
        }
    }

    @ApiResponse({
        type: Response<CreateUserResponseDto>,
    })
    @Get('/get/:id')
    async getById(@Param('id') userId: number) {
        const user = await this.userService.getById(userId);

        if(!user) {
            throw new NotFoundException(
                Response.error(`Пользователь с id ${userId} не найден`)
            );
        }

        return Response.success({
            users: [user]
        })
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
        if(fullname == null && role == null) {
            const allUsers = await this.userService.getAll();
            return Response.success({
                users: allUsers
            })
        }

        const filtredUsers = await this.userService.getByFilter({ fullname, role });
        if(filtredUsers.length) {
            return Response.success({
                users: filtredUsers
            })
        }

        throw new NotFoundException(
            Response.error(`Не удалось получить пользователей по указанным фильтрам`)
        );
    }

    @Patch('/update/:id')
    async updateUser(@Param('id') id: number, @Body() updateUser: UpdateUserDto) {
        try {
            const updatedUser = await this.userService.update(id, updateUser);

            return Response.success(updatedUser);
        } catch (e) {
            throw new InternalServerErrorException(
                Response.error(`Не удалось обновить пользователя`)
            );
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
            throw new InternalServerErrorException(
                Response.error(`Не удалось удалить пользователя`)
            );
        }
    }
}