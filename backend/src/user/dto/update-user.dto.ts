import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, IsOptional, IsPhoneNumber } from "class-validator";
import { IsStrongPassword } from "src/decorators/IsStrongPassword";

interface WorkHour {
  date: Date | string;
  hours: number;
}

export class UpdateUserDto {
  @ApiProperty()
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
  phoneNumber: string;

  @ApiProperty()
  @IsNotEmpty()
  birthDate: Date;

  @ApiProperty()
  @IsNotEmpty()
  gender: string;

  @ApiProperty()
  @IsOptional()
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

  @ApiProperty()
  @IsNotEmpty()
  workHourChanges: WorkHour[];

  @ApiProperty()
  @IsNotEmpty()
  defaultWorkHours: number;
}
