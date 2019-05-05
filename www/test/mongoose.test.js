import { expect } from 'chai';
import mongoose from 'mongoose';
import MongoMemoryServer from 'mongodb-memory-server';
import Admin from '../models/Admin';
import Info from '../models/Info';

let mongoServer;

beforeEach(async () => {
  mongoServer = new MongoMemoryServer();
  const mongoUri = await mongoServer.getConnectionString();
  await mongoose.connect(mongoUri, { useNewUrlParser: true });
});

after(() => {
  // must remove model property in order to use `mocha -watch` command
  Object.keys(mongoose.models).forEach(k => {
    delete mongoose.models[k];
  });
  Object.keys(mongoose.modelSchemas).forEach(k => {
    delete mongoose.modelSchemas[k];
  });
  mongoose.disconnect();
  mongoServer.stop();
});

describe('mongoose connect & model', () => {
  it('model creation & save', async () => {
    const cnt = await Admin.countDocuments();
    expect(cnt).to.equal(0);
    await Admin.create({ email: 'a@a.com', password: '1234' });
    const afterCnt = await Admin.countDocuments();
    expect(afterCnt).to.equal(1);
  });
});

describe('mongoDB: admin', () => {
  it('create admin account & properly hashes password', async () => {
    await Admin.create({
      email: 'a@b.com',
      password: '123455',
      username: 'kim',
    });
    const admin = await Admin.findOne({ email: 'a@b.com' });
    expect(admin.password).to.not.equal('123455');
    expect(admin.username).to.equal('kim');
  });
  it('create admin account and validate', async () => {
    await Admin.create({ email: 'c@d.com', password: '123', username: 'park' });
    const admin = await Admin.login('c@d.com', '123');
    expect(admin).to.have.property('username');
    const wrongAdmin = await Admin.login('e@f.com', 'sjkdlk');
    expect(wrongAdmin).to.equal(false);
  });
});

describe('mongoDB: info page', () => {
  it('get latest info from db', async () => {
    const latest = await Info.getLatest();
    expect(latest).to.have.property('stacks');
    expect(latest).to.have.property('indexMarkdown');
  });
  it('properly get & updates stack', async () => {
    const stacks = await Info.getStacks();
    expect(stacks.length).to.equal(0);
    await Info.addStack({ name: 'vue', desc: 'vueapp', icon: 'https://google.com' });
    const newStacks = await Info.getStacks();
    expect(newStacks.length).to.equal(1);
  });
  it('properly get & update index', async () => {
    const index = await Info.getIndex();
    expect(typeof index).to.equal('string');
    await Info.updateIndex('hellow!');
    const newIndex = await Info.getIndex();
    expect(newIndex).to.equal('hellow!');
  });
});

