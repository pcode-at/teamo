import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";

export class CreateProjectDto {
  @ApiProperty({
    description: "The name of the project",
    type: String,
  })
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    description: "The description of the project",
    type: String,
  })
  @IsNotEmpty()
  description: string;

  @ApiProperty({
    description: "The exact time when a project was created",
    type: Date,
  })
  @IsNotEmpty()
  creationDate: Date;

  @ApiProperty({
    description: "The exact time when a project was last updated",
    type: Date,
  })
  @IsNotEmpty()
  lastEdited: Date;

  @ApiProperty({
    enum: ["ACTIVE", "DISCONTINUED", "CLOSED"],
  })
  @IsNotEmpty()
  status: string;

  @ApiProperty({
    description: "The id of the user who created the project",
    type: String,
  })
  @IsNotEmpty()
  creatorId: string;

  @ApiProperty({
    description: "Skills which are required in a project",
    type: [String],
  })
  @IsNotEmpty()
  skills: any[];
}
