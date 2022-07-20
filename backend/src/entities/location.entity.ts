import { ApiProperty } from "@nestjs/swagger";
import { HttpResponse } from "./http-response.entity";

export class LocationResponse implements HttpResponse {
  @ApiProperty({ example: "200", description: "HTTP status code" })
  statusCode: number;

  @ApiProperty({ example: "Locations found", description: "Message" })
  message: string;

  error?: string;

  @ApiProperty({ example: [{ location: "USA" }], description: "Locations" })
  data?: LocationEntity | LocationEntity[];

  constructor(partial: Partial<LocationResponse>) {
    Object.assign(this, partial);
  }
}

export class LocationEntity {
  location: String;

  constructor(partial: Partial<LocationEntity>) {
    Object.assign(this, partial);
  }
}
