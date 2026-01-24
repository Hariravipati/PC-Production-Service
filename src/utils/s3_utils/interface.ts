export interface S3GenerateFileUploadPresignedUrlInterface {
    bucket_name?: string;
    object_key?: string;
    expires_in_second?: number;
    content_type?:string;
  }