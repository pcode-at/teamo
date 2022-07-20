import { ApiProperty } from "@nestjs/swagger";
import { SkillGroup } from "@prisma/client";
import { IsNotEmpty, IsOptional } from "class-validator";

export class CreateProjectDto {
    @ApiProperty()
    @IsNotEmpty()
    name: string;

    @ApiProperty()
    @IsNotEmpty()
    description: string;

    @ApiProperty()
    @IsNotEmpty()
    creationDate: Date;

    @ApiProperty()
    @IsNotEmpty()
    lastEdited: Date;

    @ApiProperty()
    @IsNotEmpty()
    status: string;

    @ApiProperty()
    @IsNotEmpty()
    creator: string;

    @ApiProperty()
    @IsNotEmpty()
    skills: any[];

    @ApiProperty()
    @IsOptional()
    skillGroups: SkillGroup[];
}

