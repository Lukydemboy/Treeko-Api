import { PutObjectCommand, S3Client } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import { Injectable } from '@nestjs/common';
import { environment } from 'src/app/environment';

@Injectable()
export class AssetsService {
  s3: S3Client;
  constructor() {
    this.s3 = new S3Client({
      region: environment.aws.region,
      endpoint: environment.aws.s3.endpoint,
      credentials: {
        accessKeyId: environment.aws.s3.accessKeyId,
        secretAccessKey: environment.aws.s3.secretAccessKey,
      },
    });
  }

  async getPresignedUrl(key: string) {
    const command = new PutObjectCommand({
      Bucket: environment.aws.s3.bucketName,
      Key: key,
    });
    return await getSignedUrl(this.s3, command, { expiresIn: 60 * 5 });
  }
}
