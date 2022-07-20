import { ApiProperty } from "@nestjs/swagger";
import { HttpResponse } from "src/entities/http-response.entity";

export class AuthorizationEntity {
  accessToken: string;
  refreshToken: string;

  constructor(partial: Partial<AuthorizationEntity>) {
    Object.assign(this, partial);
  }
}

export class AuthorizationResponse implements HttpResponse {
  @ApiProperty({ example: "200", description: "HTTP status code" })
  statusCode: number;

  @ApiProperty({ example: "Locations found", description: "Message" })
  message: string;

  error?: string;

  @ApiProperty({
    example: [
      {
        refreshToken:
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZGVudGlmaWVyIjp7InVzZXJJZGVudGlmaWVyIjp7ImlkZW50aWZpZXIiOiJhYmMifX0sImlhdCI6MTY1NzExMDE0OSwiZXhwIjoxNjU3NzE0OTQ5fQ.2ElXSU7zacLs2GScN4GJG56bNMnQmRMXwFPihFfq1EY",
        accessToken:
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZGVudGlmaWVyIjp7InVzZXJJZGVudGlmaWVyIjp7ImlkZW50aWZpZXIiOiJhYmMifX0sImlhdCI6MTY1NzExMDE0OSwiZXhwIjoxNjU3NzE0OTQ5fQ.2ElXSU7zacLs2GScN4GJG56bNMnQmRMXwFPihFfq1EY",
      },
    ],
    description: "Authorization",
  })
  data?: AuthorizationEntity;

  constructor(partial: Partial<AuthorizationResponse>) {
    Object.assign(this, partial);
  }
}


