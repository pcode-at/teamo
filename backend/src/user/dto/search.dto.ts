import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";

export class SearchDto {
  @ApiProperty()
  @IsNotEmpty()
  parameters: SearchAttribute[];
}

class SearchAttribute {
  attribute: string;
  value: string;
  rating?: number | number[];
  required: boolean;
}
