import {Provider} from "@nestjs/common";
import {InjectDataSource} from "../db/decorators/inject-data-source.decorator";
import {DataSource} from "typeorm";
import {User} from "./models/user";
import {CreateUserDto} from "./models/dto/create-user.dto";

export abstract class UsersService {
    abstract create(user: User): Promise<number>;
    abstract getAll(): Promise<Array<User>>;
    abstract getById(id: number): Promise<User>;
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

    async delete(id: number) {
        const userRepository = this.db.getRepository(User);
        const item = await userRepository.findOne({
            where: { id }
        });

        if (item) {
            await userRepository.remove(item);
        }

        return item;
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