import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";

export class SearchDto {
  @ApiProperty()
  @IsNotEmpty()
  parameters: SearchAttribute[];
}

class SearchAttribute {
  attribute: "skill" | "department" | "location";	
  value: string | string[];
  rating?: number;
  required: boolean;
}
