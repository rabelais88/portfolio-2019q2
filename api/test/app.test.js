import { expect } from 'chai';
import supertest from 'supertest';
import mongoose from 'mongoose';
import MongoMemoryServer from 'mongodb-memory-server';
import faker from 'faker';

import app from '../src/server-api';
import Admin from '../src/models/Admin';
import Post from '../src/models/Post';

const req = supertest(app);
const testAdmin = { email: 'aaa@bbb.com', password: '1234' };
let mongoServer;
let token;

before(async () => {
  mongoServer = new MongoMemoryServer();
  const mongoUri = await mongoServer.getConnectionString();
  await mongoose.connect(mongoUri, {
    useNewUrlParser: true,
    useCreateIndex: true,
  });
});

after(async () => {
  await Admin.deleteMany({});
  await Post.deleteMany({});
  mongoose.disconnect();
  await mongoServer.stop();
});

describe('server app', () => {
  // beforeEach and afterEach must be placed inside same block with the rest of the test!!
  beforeEach(async () => {
    await Admin.create(testAdmin);
    const afterLogin = await req
      .post('/auth')
      .auth(testAdmin.email, testAdmin.password);
    token = afterLogin.body.token;
    const createPost = (_, i) =>
      Post.create({
        title: faker.lorem.sentence(),
        content: faker.lorem.paragraph(),
      });
    const randomPosts = new Array(100).fill(0).map(createPost);
    await Promise.all(randomPosts);
  });

  afterEach(async () => {
    await Admin.deleteMany({});
    await Post.deleteMany({});
  });

  it('GET /info/intro', async () => {
    const res = await req.get('/info/intro').expect(200);
    expect(typeof res.body).to.equal('string');
    expect(res.body).to.not.equal('');
  });

  it('GET /auth (auth validate)', async () => {
    const validation = await req
      .get('/auth')
      .set('Authorization', `Bearer ${token}`)
      .expect(200);
    expect(validation.body).to.include({ email: testAdmin.email });
  });

  it('GET /info/posts', async () => {
    await Post.create({ title: 'GOAT', content: 'rare goat' });
    await Post.create({ title: 'superGoat', content: 'sweet goat' });
    let res = await req.get('/info/posts?limit=10&page=1');
    expect(res.body.docs.length).to.equal(10);
    res = await req.get('/info/posts').expect(422);
    expect(typeof res.body).to.equal('string'); // error message
    res = await req.get('/info/posts?page=-1&limit=-1').expect(422);
    expect(typeof res.body).to.equal('string'); // error message
    res = await req.get('/info/posts?limit=10&page=1&title=goat&');
    expect(res.body.docs.length).to.equal(2);
    res = await req.get('/info/posts?limit=10&page=1&title=goat&content=sweet');
    expect(res.body.docs.length).to.equal(1);
    res = await req.get('/info/posts?limit=10&page=2');
    expect(res.body.docs.length).to.equal(10);
  });

  it('GET /info/post/:postid', async () => {
    const post = await Post.create({ title: 'testpost', content: 'what?' });
    const postId = post._id;
    const res = await req.get(`/info/post/${postId}`).expect(200);
    expect(res.body).to.include({ title: 'testpost' });
  });

  it('DELETE /info/post/:postid', async () => {
    const postId = (await Post.findOne()).id;
    await req.delete(`/info/post/${postId}`)
      .set('Authorization', `Bearer ${token}`)
      .expect(200);
    const deletedPost = await Post.findOne({ _id: postId });
    expect(deletedPost).to.equal(null);
  });
});
