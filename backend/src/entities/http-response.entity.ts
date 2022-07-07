export interface HttpResponse {
  statusCode: number;
  message: string;
  error?: string;
  data?: any;
}
