export interface HttpResponse {
  status: number;
  message: string;
  error?: string;
  data?: any;
}
