import { Logger } from '@nestjs/common';
import * as dotenv from 'dotenv'

dotenv.config()

export type ConfigType = {
    PORT: number;
    DB_URL: string;
    REDIS_URL: string;
    EMAIL: string;
    EMAIL_PASSWORD: string;
    ACCESS_TOKEN_SECRET_KEY: string;
    ACCESS_TOKEN_EXPIRED_TIME: string;
    REFRESH_TOKEN_SECRET_KEY: string;
    REFRESH_TOKEN_EXPIRED_TIME: string
}

const requiredVariables = [
    'PORT',
    'DEV_DB_URL',
    'PROD_DB_URL',
    'REDIS_URL',
    'EMAIL',
    'EMAIL_PASSWORD',
    'ACCESS_TOKEN_SECRET_KEY',
    'ACCESS_TOKEN_EXPIRED_TIME',
    'REFRESH_TOKEN_SECRET_KEY',
    'REFRESH_TOKEN_EXPIRED_TIME',
]

const missingVariables = requiredVariables.filter((variable => {
    const value = process.env[variable];
    return !value || value.trim() === "";
}))

if (missingVariables.length > 0) {
    Logger.error(`Missing or empty required environment variables: ${missingVariables.join(", ")}`)
    process.exit()
}

export const config: ConfigType = {
    PORT: parseInt(process.env.PORT),
    DB_URL: process.env.NODE_ENV === 'dev'
        ? (process.env.DEV_DB_URL)
        : (process.env.PROD_DB_URL),
    REDIS_URL: process.env.REDIS_URL,
    EMAIL: process.env.EMAIL,
    EMAIL_PASSWORD: process.env.EMAIL_PASSWORD,
    ACCESS_TOKEN_SECRET_KEY: process.env.ACCESS_TOKEN_SECRET_KEY,
    ACCESS_TOKEN_EXPIRED_TIME: process.env.ACCESS_TOKEN_EXPIRED_TIME,
    REFRESH_TOKEN_SECRET_KEY: process.env.REFRESH_TOKEN_SECRET_KEY,
    REFRESH_TOKEN_EXPIRED_TIME: process.env.REFRESH_TOKEN_EXPIRED_TIME,
}