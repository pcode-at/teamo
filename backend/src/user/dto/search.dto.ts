import { IsNotEmpty } from "class-validator";

export class SearchDto {
  @IsNotEmpty()
  searches: SearchAttribute[];
}

class SearchAttribute {
  attribute: string;
  value: string;
  mustHave: boolean;
}
