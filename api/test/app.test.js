import { expect } from 'chai';
import app from '../src/server-api';
import supertest from 'supertest';
import mongoose from 'mongoose';
import MongoMemoryServer from 'mongodb-memory-server';
import Admin from '../src/models/Admin';


let mongoServer;
const req = supertest(app);
let token;
const testAdmin = { email: 'aaa@bbb.com', password: '1234' };

beforeEach(async () => {
  mongoServer = new MongoMemoryServer();
  const mongoUri = await mongoServer.getConnectionString();
  await mongoose.connect(mongoUri, { useNewUrlParser: true, useCreateIndex: true });
  await Admin.create(testAdmin);
  const afterLogin = await req.post('/auth').auth(testAdmin.email, testAdmin.password);
  token = afterLogin.body.token;
});

describe('server app', () => {
  it('GET /info/intro', async () => {
    const intro = await req.get('/info/intro').expect(200);
    expect(typeof intro.body).to.equal('string');
    expect(intro.body).to.not.equal('');
  });
  it('GET /auth (auth validate)', async () => {
    const validation = await req.get('/auth').set('Authorization', `Bearer ${token}`).expect(200);
    expect(validation.body).to.include({ email: testAdmin.email });

  });
});