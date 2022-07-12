import { Exclude } from "class-transformer";
import { HttpResponse } from "./http-response.entity";
import { UserEntity } from "./user.entity";

export class UserResponse implements HttpResponse {
  statusCode: number;
  message: string;
  error?: string;
  data?: UserEntity | UserEntity[];

  constructor(partial: Partial<UserResponse>) {
    Object.assign(this, partial);
  }
}
