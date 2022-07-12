import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";

export class SkillDto {
    @ApiProperty()
    @IsNotEmpty()
    skill: string;

    @ApiProperty()
    @IsNotEmpty()
    rating: string;

    @ApiProperty()
    @IsNotEmpty()
    identifier: string;
}