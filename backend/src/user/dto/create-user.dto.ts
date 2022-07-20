import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, IsOptional, IsPhoneNumber } from "class-validator";
import { Date } from "mongoose";
import { IsStrongPassword } from "src/decorators/IsStrongPassword";

export class CreateUserDto {
  @ApiProperty({
    description: "The identifier of the user",
    type: String,
  })
  @IsNotEmpty()
  identifier: string;

  @ApiProperty({
    description: "The password of the user",
    type: String,
  })
  @IsStrongPassword()
  @IsNotEmpty()
  password: string;

  @ApiProperty({
    description: "The name of the user",
    type: String,
  })
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    description: "The email of the user",
    type: String,
  })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({
    description: "The phone number of the user",
    type: String,
  })
  @IsOptional()
  @IsPhoneNumber()
  phoneNumber: string;

  @ApiProperty({
    description: "The birth date of the user",
    type: Date,
  })
  @IsNotEmpty()
  birthDate: Date;

  @ApiProperty({
    description: "The gender of a user",
    enum: ["m", "f", "d"],
  })
  @IsNotEmpty()
  gender: string;

  @ApiProperty({
    description: "The reference to a user's profile picture",
    type: String,
  })
  @IsOptional()
  photo: string;

  @ApiProperty({
    description: "The user's roles",
    type: [String],
  })
  @IsNotEmpty()
  roles: string[];

  @ApiProperty({
    description: "The user's departments",
    type: [String],
  })
  @IsOptional()
  departments: string[];

  @ApiProperty({
    description: "The user's location",
    type: String,
  })
  @IsNotEmpty()
  location: string;
}
