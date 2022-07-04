import { HttpResponse } from "src/entities/http-response.entity";

export interface Authorization extends HttpResponse {
  status: number;
  error?: string;
  message: string;
  data?: any;
  accessToken: string;
  refreshToken?: string;
}
