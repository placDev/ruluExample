import {ApiProperty} from "@nestjs/swagger";
import {IsNotEmpty, IsNumber, IsString} from "class-validator";

export class UpdateUserDto {
    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    full_name: string;

    @ApiProperty()
    @IsNotEmpty()
    role: string;
}