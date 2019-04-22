import { expect } from 'chai';
import mongoose from 'mongoose';
import MongoMemoryServer from 'mongodb-memory-server';
import User from '../models/User';

let mongoServer;

beforeEach(async () => {
  mongoServer = new MongoMemoryServer();
  const mongoUri = await mongoServer.getConnectionString()
  await mongoose.connect(mongoUri, { useNewUrlParser: true });
});

after(() => {
  // must remove model property in order to use `mocha -watch` command
  Object.keys(mongoose.models).forEach((k) => {
    delete mongoose.models[k];
  });
  Object.keys(mongoose.modelSchemas).forEach((k) => {
    delete mongoose.modelSchemas[k];
  });
  mongoose.disconnect();
  mongoServer.stop();
});

describe('mongoose connect & model', () => {
  it('model creation & save', async () => {
    const cnt = await User.countDocuments();
    expect(cnt).to.equal(0);
    await User.create({ name: 'Kim' });
    const afterCnt = await User.countDocuments();
    expect(afterCnt).to.equal(1);
  });
});