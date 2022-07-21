import { ApiProperty } from "@nestjs/swagger";
import { Exclude } from "class-transformer";
import { HttpResponse } from "./http-response.entity";

export class SkillResponse implements HttpResponse {
  @ApiProperty({ example: "200", description: "HTTP status code" })
  statusCode: number;

  @ApiProperty({ example: "Locations found", description: "Message" })
  message: string;

  error?: string;
  @ApiProperty({
    examples: [
      { id: "62ce572313abfde432", name: "CIA" },
      {
        id: "62ce572313abfde432",
        name: "FBI",
        opacity: 0.5,
      },
    ],
    description: "Skills",
  })
  data?: SkillEntity | SkillEntity[];

  constructor(partial: Partial<SkillResponse>) {
    Object.assign(this, partial);
  }
}

export class SkillEntity {
  id: string;
  name: string;
  opacity?: number;

  @Exclude()
  skillMatrix: SkillRating[];

  constructor(partial: Partial<SkillEntity>) {
    Object.assign(this, partial);
  }
}

export class SkillRating {
  rating: number;
  aggregation: string;
}
