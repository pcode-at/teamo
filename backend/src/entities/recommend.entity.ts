import { HttpResponse } from "./http-response.entity";
import { UserEntity } from "./user.entity";

export class RecommendResponse implements HttpResponse {
  statusCode: number;
  message: string;
  error?: string;
  data?: RecommendEntity;

  constructor(partial: Partial<RecommendResponse>) {
    Object.assign(this, partial);
  }
}

export class RecommendEntity {
  users: UserEntity[][];

  constructor(partial: Partial<RecommendEntity>) {
    Object.assign(this, partial);
  }
}
