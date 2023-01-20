import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';
import { stopMongoInMemoryServer } from '../src/configs/mongo.config';
import { validationPipeOptions } from '../src/configs/validation-pipe.config';

jest.setTimeout(15000);

describe('AppController (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(new ValidationPipe(validationPipeOptions));
    await app.init();
  });

  it('/parse-product/:kaspiId (GET)- failed - wrong kaspiId', async () => {
    const kaspiId = '100692388a';
    return request(app.getHttpServer())
      .get(`/parse-product/${kaspiId}`)
      .expect(400)
      .then(({ body }: request.Response) => {
        expect(body.message[0]).toBe('kaspiId must be a number string');
      });
  });

  it('/parse-product/:kaspiId (GET)- success - Should return title and price of a product', async () => {
    const kaspiId = '100692388';
    return request(app.getHttpServer())
      .get(`/parse-product/${kaspiId}`)
      .expect(200)
      .then(({ body }: request.Response) => {
        expect(body.title).toBeDefined();
        expect(body.price).toBeGreaterThan(0);
      });
  });

  afterAll(async () => {
    await stopMongoInMemoryServer();
    await app.close();
  });
});
