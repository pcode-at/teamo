import { HttpResponse } from "src/entities/http-response.entity";

export class Authorization implements HttpResponse {
  statusCode: number;
  error?: string;
  message: string;
  data?: any;
  accessToken: string;
  refreshToken: string;

  constructor(partial: Partial<Authorization>) {
    Object.assign(this, partial);
  }
}
