import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, IsOptional, IsPhoneNumber } from "class-validator";
import { Date } from "mongoose";
import { IsStrongPassword } from "src/decorators/IsStrongPassword";

export class CreateUserDto {
    @ApiProperty()
    @IsNotEmpty()
    identifier: string;

    @ApiProperty()
    @IsStrongPassword()
    @IsNotEmpty()
    password: string;

    @ApiProperty()
    @IsNotEmpty()
    name: string;

    @ApiProperty()
    @IsEmail()
    @IsNotEmpty()
    email: string;

    @ApiProperty()
    @IsOptional()
    @IsPhoneNumber()
    @IsNotEmpty()
    phoneNumber: string;

    @ApiProperty()
    @IsNotEmpty()
    birthDate: Date;

    @ApiProperty()
    @IsNotEmpty()
    gender: string;

    @ApiProperty()
    @IsOptional()
    @IsNotEmpty()
    photo: string;

    @ApiProperty()
    @IsNotEmpty()
    roles: string[];

    @ApiProperty()
    @IsOptional()
    @IsNotEmpty()
    departments: string[];

    @ApiProperty()
    @IsNotEmpty()
    location: string;
}
