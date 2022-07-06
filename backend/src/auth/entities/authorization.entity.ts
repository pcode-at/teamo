import { HttpResponse } from "src/entities/http-response.entity";

export class AuthorizationResponse implements HttpResponse, Authorization {
  statusCode: number;
  error?: string;
  message: string;
  data?: any;

  constructor(partial: Partial<AuthorizationResponse>) {
    Object.assign(this, partial);
  }
  accessToken: string;
  refreshToken: string;
}

export class Authorization {
  accessToken: string;
  refreshToken: string;

  constructor(partial: Partial<Authorization>) {
    Object.assign(this, partial);
  }
}
