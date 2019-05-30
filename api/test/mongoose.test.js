import { expect } from 'chai';
import mongoose from 'mongoose';
import MongoMemoryServer from 'mongodb-memory-server';
import Admin from '../src/models/Admin';
import Info from '../src/models/Info';
import Post from '../src/models/Post';
import Stack from '../src/models/Stack';

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

describe('mongoDB: info page - intro', () => {
  it('get latest info from db', async () => {
    const latest = await Info.getLatest();
    expect(latest).to.have.property('intro');
  });
});

describe('mongoDB: stacks', () => {

});

describe('mongoDB: posts', () => {
  it('Create and deletion', async () => {
    const post = await Post.create({ title: 'testtitle', content: 'abcdefg' });
    expect(post.title).to.equal('testtitle');
    expect(post.content).to.equal('abcdefg');
    Post.remove({ id: post.id });
    const afterDeletion = await Post.findOne({ id: post.id });
    expect(afterDeletion).to.equal(null);
  });
  it('List Query and pagination', async () => {
    const createPost = (_, i) => Post.create({ title: `title-${i + 1}`, content: `content-${i + 1}` });
    const promisedPosts = new Array(100).fill(0).map(createPost);
    await Promise.all(promisedPosts);
    let postLength = await Post.countDocuments();
    expect(postLength).to.equal(100);
    let posts = await Post.getLists(10);
    expect(posts.posts.length).to.equal(10);
    expect(posts.nextCursor).to.equal(posts.posts[9].id)
    expect(posts.hasPrev).to.equal(false);
    posts = await Post.getLists(10, posts.nextCursor);
    console.log(posts);
  });
});

