import { Type } from "class-transformer";
import { IsDate, IsEmail, IsNotEmpty, IsOptional, IsPhoneNumber } from "class-validator";
import { Date } from "mongoose";
import { IsStrongPassword } from "src/decorators/IsStrongPassword";

export class CreateUserDto {
    @IsNotEmpty()
    identifier: string;

    @IsStrongPassword()
    @IsNotEmpty()
    password: string;

    @IsNotEmpty()
    name: string;

    @IsEmail()
    @IsNotEmpty()
    email: string;

    @IsOptional()
    @IsPhoneNumber()
    @IsNotEmpty()
    phoneNumber: string;

    @IsDate()
    @Type(() => Date)
    @IsNotEmpty()
    birthDate: Date;

    @IsNotEmpty()
    gender: string;

    @IsOptional()
    @IsNotEmpty()
    photo: string;

    @IsNotEmpty()
    roles: string[];

    @IsOptional()
    @IsNotEmpty()
    departments: string[];
}