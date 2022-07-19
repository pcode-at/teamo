import { Exclude } from "class-transformer";
import { HttpResponse } from "./http-response.entity";

export class ProjectResponse implements HttpResponse {
  statusCode: number;
  message: string;
  error?: string;
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
