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
  footballApi: {
    host: process.env.FOOTBAL_API_HOST,
    apiKey: process.env.FOOTBALL_API_KEY,
    baseUrl: process.env.FOOTBALL_API_BASE_URL,
    leagueId: process.env.FOOTBALL_API_LEAGUE_ID,
    season: process.env.FOOTBALL_API_SEASON,
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
