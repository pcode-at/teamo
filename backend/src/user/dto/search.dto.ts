import { IsNotEmpty } from "class-validator";

export class SearchDto {
  @IsNotEmpty()
  parameters: SearchAttribute[];
}

class SearchAttribute {
  attribute: string;
  value: string;
  rating?: number | number[];
  required: boolean;
}
