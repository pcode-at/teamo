import { Exclude } from "class-transformer";
import { HttpResponse } from "./http-response.entity";
import { UserEntity } from "./user.entity";

export class UserResponse implements HttpResponse {
  statusCode: number;
  message: string;
  error?: string;
  data?: UserEntity;

  constructor(partial: Partial<UserResponse>) {
    Object.assign(this, partial);
  }
}

export class UserResponses implements HttpResponse {
  statusCode: number;
  message: string;
  error?: string;
  data?: UserEntity[];

  constructor(partial: Partial<UserResponses>) {
    Object.assign(this, partial);
  }
}
