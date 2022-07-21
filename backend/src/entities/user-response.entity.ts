import { ApiProperty } from "@nestjs/swagger";
import { Exclude } from "class-transformer";
import { HttpResponse } from "./http-response.entity";
import { UserEntity } from "./user.entity";

export class UserResponse implements HttpResponse {
  @ApiProperty({ example: "200", description: "HTTP status code" })
  statusCode: number;

  @ApiProperty({ example: "Locations found", description: "Message" })
  message: string;

  error?: string;
  @ApiProperty({
    example: [
      {
        birthdate: "1956-04-04",
        email: "john@example.com",
        gender: "m",
        identifier: "Burn",
        location: "USA",
        phoneNumber: "+1 252-555-612",
        name: "William J. Burns",
        departments: ["Development"],
        roles: ["Manager"],
        photo: "84593u5ijtirhjetiherterkt.png",
      },
    ],
    description: "Users",
  })
  data?: UserEntity | UserEntity[];

  constructor(partial: Partial<UserResponse>) {
    Object.assign(this, partial);
  }
}
