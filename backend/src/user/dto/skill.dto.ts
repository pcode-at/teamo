import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";

export class SkillDto {
    @ApiProperty()
    @IsNotEmpty()
    skill: string;

    @ApiProperty()
    @IsNotEmpty()
    rating: number;

    @ApiProperty()
    @IsNotEmpty()
    identifier: string;
}