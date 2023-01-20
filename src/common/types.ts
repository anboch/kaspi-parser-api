import { Types } from 'mongoose';

export type mongoId = Types.ObjectId;

export interface IEnvironmentVariables {
  MONGO_LOGIN: string;
  MONGO_PASSWORD: string;
  MONGO_HOST: string;
  MONGO_PORT: number;
  MONGO_DATABASE: string;
  MONGO_AUTH_DATABASE: string;
  NODE_ENV: string;
}
