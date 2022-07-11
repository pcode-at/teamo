import { IsNotEmpty } from "class-validator";

export class SearchDto {
  @IsNotEmpty()
  parameters: SearchAttribute[];
}

class SearchAttribute {
  attribute: string;
  value: string;
  rating?: number;
  required: boolean;
}
