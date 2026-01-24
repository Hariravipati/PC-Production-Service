 


interface ApiResponse<T> {
  message: string;
  data: T;
  success: boolean;
  status: number;
}
