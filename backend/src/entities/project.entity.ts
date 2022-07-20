import { ApiProperty } from "@nestjs/swagger";
import { Exclude } from "class-transformer";
import { HttpResponse } from "./http-response.entity";

export class ProjectResponse implements HttpResponse {
  @ApiProperty({ example: "200", description: "HTTP status code" })
  statusCode: number;

  @ApiProperty({ example: "Locations found", description: "Message" })
  message: string;

  error?: string;

  @ApiProperty({
    example: [
      {
        name: "Project Bluebird",
        description: "Project Bluebird is a CIA project that researched interragtion methods.",
        creationDate: "1951-05-12",
        lastEdited: "1981-02-04",
        status: "Discontinued",
      },
    ],
    description: "Projects",
  })
  data?: ProjectEntity | ProjectEntity[];
}

export class ProjectEntity {
  id: string;
  name: string;
  description: string;
  creationDate: Date;
  lastEdited: Date;
  status: string;

  @Exclude()
  creatorId: string;

  @Exclude()
  memberIds: string[];

  @Exclude()
  skillIds: string[];

  @Exclude()
  bookmarkIds: string[];

  constructor(partial: Partial<ProjectEntity>) {
    Object.assign(this, partial);
  }
}
