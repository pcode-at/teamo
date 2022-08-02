import { IsNotEmpty, IsOptional } from "class-validator";

import { ApiProperty } from "@nestjs/swagger";

export class CreateProjectDto {
    @ApiProperty()
    @IsNotEmpty()
    name: string;

    @ApiProperty()
    @IsNotEmpty()
    description: string;

    skills: any[];
}

