import { expect } from 'chai';
import app from '../src/server-api';
import supertest from 'supertest';
import mongoose from 'mongoose';
import MongoMemoryServer from 'mongodb-memory-server';

let mongoServer;
const req = supertest(app);

beforeEach(async () => {
  mongoServer = new MongoMemoryServer();
  const mongoUri = await mongoServer.getConnectionString();
  await mongoose.connect(mongoUri, { useNewUrlParser: true, useCreateIndex: true });
});

describe('server app', () => {
  it('app: check index', async () => {
    const intro = await req.get('/info/intro').expect(200);
    expect(typeof intro.body).to.equal('string');
    expect(intro.body).to.not.equal('');
  });
});