import { ApiProperty } from "@nestjs/swagger";
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
    creatorId: string;

    @ApiProperty()
    @IsOptional()
    @IsNotEmpty()
    memberIds: string[];
}
