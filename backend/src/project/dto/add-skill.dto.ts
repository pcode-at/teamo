import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";

export class AddSkillDTO {
  @ApiProperty()
  @IsNotEmpty()
  skillId: string;

  @ApiProperty()
  @IsNotEmpty()
  rating: number;

  @ApiProperty()
  @IsNotEmpty()
  projectId: string;
}
