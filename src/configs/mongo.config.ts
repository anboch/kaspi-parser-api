import { ConfigService } from '@nestjs/config';
import { MongooseModuleFactoryOptions } from '@nestjs/mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';
import { IEnvironmentVariables } from '../common/types';

type AllValuesAreString = { [key: string]: string };
let mongoInMemoryServer: MongoMemoryServer;

export const getMongoConfig = async (
  config: ConfigService<IEnvironmentVariables>
): Promise<MongooseModuleFactoryOptions> => {
  let mongoURI: string;
  const mongoURIOptions = {
    MONGO_LOGIN: config.get('MONGO_LOGIN', { infer: true }),
    MONGO_PASSWORD: config.get('MONGO_PASSWORD', { infer: true }),
    MONGO_HOST: config.get('MONGO_HOST', { infer: true }),
    MONGO_PORT: config.get('MONGO_PORT', { infer: true }),
    MONGO_DATABASE: config.get('MONGO_DATABASE', { infer: true }),
    MONGO_AUTH_DATABASE: config.get('MONGO_AUTH_DATABASE', { infer: true }),
  };

  if (
    config.get('NODE_ENV', { infer: true }) !== 'test' &&
    Object.values(mongoURIOptions).every((value) => value)
  ) {
    mongoURI = getMongoURI(mongoURIOptions as unknown as AllValuesAreString);
  } else {
    mongoInMemoryServer = await MongoMemoryServer.create();
    mongoURI = mongoInMemoryServer.getUri();
  }
  return { uri: mongoURI };
};

export const stopMongoInMemoryServer = async () => {
  if (mongoInMemoryServer) {
    await mongoInMemoryServer.stop();
  }
};

const getMongoURI = (options: AllValuesAreString): string =>
  'mongodb://' +
  options.MONGO_LOGIN +
  ':' +
  options.MONGO_PASSWORD +
  '@' +
  options.MONGO_HOST +
  ':' +
  options.MONGO_PORT +
  '/' +
  options.MONGO_DATABASE +
  '?' +
  `authSource=${options.MONGO_AUTH_DATABASE}`;

export const collectionNames = {
  PRODUCT: 'products',
} as const;
