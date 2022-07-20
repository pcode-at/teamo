import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";

export class UpdateProjectDto {
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
}
