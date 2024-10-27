import {ApiProperty} from "@nestjs/swagger";
import {IsNotEmpty, IsNumber, IsString} from "class-validator";

export class CreateUserDto {
    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    full_name: string;

    @ApiProperty()
    @IsNotEmpty()
    role: string;

    @ApiProperty()
    @IsNotEmpty()
    @IsNumber()
    efficiency: number;
}