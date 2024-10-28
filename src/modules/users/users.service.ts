import {Provider} from "@nestjs/common";
import {InjectDataSource} from "../db/decorators/inject-data-source.decorator";
import {DataSource} from "typeorm";
import {User} from "./models/user";
import {CreateUserDto} from "./models/dto/create-user.dto";
import {UpdateUserDto} from "./models/dto/update-user.dto";

export type UserFilter = {
    fullname: string | null,
    role: string | null,
    efficiency: number | null,
}

export abstract class UsersService {
    abstract create(user: CreateUserDto): Promise<number>;
    abstract getAll(): Promise<Array<User>>;
    abstract getById(id: number): Promise<User>;
    abstract getByFilter(filter: UserFilter): Promise<Array<User>>;
    abstract update(id: number, updateData: UpdateUserDto): Promise<User>;
    abstract delete(id: number): Promise<User>;
    abstract deleteAll(): Promise<void>;
}

export class UserServiceImpl extends UsersService {
    constructor(
        @InjectDataSource() private readonly db: DataSource
    ) {
        super();
    }

    async create(userDto: CreateUserDto) {
        const userRepository = this.db.getRepository(User);

        const newUser = await userRepository.save({
            role: userDto.role,
            efficiency: userDto.efficiency,
            full_name: userDto.full_name
        });

        return newUser.id;
    }

    async getAll() {
        const userRepository = this.db.getRepository(User);
        return await userRepository.find();
    }

    async getById(id: number) {
        const userRepository = this.db.getRepository(User);
        return await userRepository.findOne({
            where: {
                id: id
            }
        });
    }

    async getByFilter(filter: UserFilter): Promise<Array<User>> {
        const userRepository = this.db.getRepository(User);
        return await userRepository.findBy({
            full_name: filter.fullname ?? undefined,
            role: filter.role ?? undefined,
            efficiency: isNaN(filter.efficiency) ? undefined : filter.efficiency,
        })
    }

    async update(id: number, updateData: UpdateUserDto): Promise<User> {
        const userRepository = this.db.getRepository(User);

        await userRepository.update(id, {
            full_name: updateData.full_name,
            role: updateData.role
        });

        return await userRepository.findOne({ where: { id } });
    }

    async delete(id: number) {
        const userRepository = this.db.getRepository(User);
        const item = await userRepository.findOne({
            where: { id }
        });

        if (!item) {
            throw new Error('Пользователь не найден')
        }

        await userRepository.remove(item);

        return { ...item, id };
    }

    async deleteAll() {
        const userRepository = this.db.getRepository(User);
        await userRepository.clear();
    }
}

export const UserServiceProvider: Provider = {
    provide: UsersService,
    useClass: UserServiceImpl,
}