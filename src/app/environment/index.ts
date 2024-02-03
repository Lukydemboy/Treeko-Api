import * as dotenv from 'dotenv';
import * as process from 'process';

dotenv.config();

export const environment = {
  type: process.env.NODE_ENV,
  appDeeplinkBase: process.env.MOBILE_APP_DEEPLINK_BASE_URL,
  swaggerEnabled: process.env.SWAGGER_ENABLED === 'true',
  db: {
    host: process.env.MYSQL_HOST,
    port: +process.env.MYSQL_PORT,
    name: process.env.MYSQL_DATABASE,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
  },
  aws: {
    region: process.env.S3_BUCKET_REGION,
    s3: {
      bucketName: process.env.S3_BUCKET_NAME,
      accessKeyId: process.env.S3_ACCESS_KEY_ID,
      secretAccessKey: process.env.S3_SECRET_ACCESS_KEY,
      endpoint: process.env.S3_BUCKET_ENDPOINT,
    },
  },
  auth: {
    accessToken: {
      jwtSecret: process.env.ACCESS_TOKEN_JWT_SECRET,
      jwtExpirationTime: process.env.ACCESS_TOKEN_JWT_EXPIRATION_TIME,
    },
    refreshToken: {
      jwtSecret: process.env.REFRESH_TOKEN_JWT_SECRET,
      jwtExpirationTime: process.env.REFRESH_TOKEN_EXPIRATION_TIME,
    },
  },
  mail: {
    defaultSender: process.env.DEFAULT_EMAIL_SENDER,
    sendgrid: {
      apiKey: process.env.SENDGRID_API_KEY,
      templates: {
        verifyEmail: process.env.SENDGRID_TEMPLATE_VERIFY_EMAIL,
        resetPassword: process.env.SENDGRID_TEMPLATE_RESET_PASSWORD,
        passwordIsReset: process.env.SENDGRID_TEMPLATE_PASSWORD_IS_RESET,
      },
    },
  },
};
