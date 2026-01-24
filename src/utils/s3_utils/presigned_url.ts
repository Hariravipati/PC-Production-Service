import { S3GenerateFileUploadPresignedUrlInterface } from './interface';
const AWS = require('aws-sdk');

const s3 = new AWS.S3();
import * as fs from 'fs';

export class S3PresignedUrlRequests {
  static async generateFileUploadPresignedUrl(
    query: S3GenerateFileUploadPresignedUrlInterface,
  ) {
    const params = {
      Bucket: query.bucket_name,
      Key: query.object_key,
      Expires: query.expires_in_second ? query.expires_in_second : 600,
      ContentType: query.content_type
        ? query.content_type
        : 'application/octet-stream',
    };
    return s3.getSignedUrlPromise('putObject', params);
  }

  static async readFileUploadPresignedUrl(
    query: S3GenerateFileUploadPresignedUrlInterface,
  ): Promise<string> {
    const params = {
      Bucket: query.bucket_name,
      Key: query.object_key,
      Expires: query.expires_in_second ? query.expires_in_second : 600,
      ResponseContentType: query.content_type
        ? query.content_type
        : 'application/octet-stream',
    };

    return s3.getSignedUrlPromise('getObject', params);
  }

  static async uploadFileToS3(
    bucketName: string,
    objectKey: string,
    filePathOrBuffer: string | Buffer,
    contentType: string,
  ): Promise<any> {
    const params = {
      Bucket: bucketName,
      Key: objectKey,
      Body:
        typeof filePathOrBuffer === 'string'
          ? fs.createReadStream(filePathOrBuffer)
          : filePathOrBuffer,
      ContentType: contentType,
    };

    return s3.upload(params).promise();
  }

  static async deleteFile(fileName: string): Promise<boolean> {
    const folderName = 'Mol_Bulk_edit';
    const fileKey = `${folderName}/${fileName}`;
    const s3 = new AWS.S3({
      accessKeyId: process.env.AWS_ACCESS_KEY_ID,
      secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
      region: process.env.AWS_REGION,
    });

    const params = {
      Bucket: process.env.BUCKET_NAME,
      Key: fileKey,
    };

    await s3.deleteObject(params).promise();
    return true;
  }
}
