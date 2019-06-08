import { expect } from 'chai';
import supertest from 'supertest';
import mongoose from 'mongoose';
import MongoMemoryServer from 'mongodb-memory-server';
import faker from 'faker';
import path from 'path';
import fs from 'fs';
import _get from 'lodash/get';

import app from '../src/server-api';
import Admin from '../src/models/Admin';
import Post from '../src/models/Post';
import Stack from '../src/models/Stack';

const req = supertest(app);
const testAdmin = { email: 'aaa@bbb.com', password: '1234' };
let mongoServer;
let token;

// if url is not properly designated, supertest may throw 'read.ECONNRESET' error!

before(async () => {
  mongoServer = new MongoMemoryServer();
  const mongoUri = await mongoServer.getConnectionString();
  await mongoose.connect(mongoUri, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
  });
});

after(async () => {
  await Admin.deleteMany({});
  await Post.deleteMany({});
  await Stack.deleteMany({});
  mongoose.disconnect();
  await mongoServer.stop();
});

const removeTempFile = filename =>
  new Promise((resolve, reject) => {
    fs.unlink(path.resolve(`upload/${filename}`), err => {
      if (err) console.log(err);
      resolve();
    });
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
    const createStack = (_, i) =>
      Stack.create({
        name: faker.hacker.abbreviation(),
        desc: faker.lorem.paragraph(),
      });
    const randomStacks = new Array(30).fill(0).map(createStack);
    await Promise.all([...randomPosts, ...randomStacks]);
  });

  afterEach(async () => {
    await Admin.deleteMany({});
    await Post.deleteMany({});
    // await Stack.deleteMany({});
  });

  it('GET /wrongaddress', async () => {
    await req.get('/wrongaddress').expect(404);
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
    await req.get('/auth').expect(401);
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
    res = await req.get('/info/posts?limit=10&page=1&sortfield=title&sortdirection=asc');
    const titles = res.body.docs.map(d => d.title);
    expect(titles[0] < titles[1]).to.equal(true);
    expect(titles[1] < titles[2]).to.equal(true);
    expect(titles[0] < titles[2]).to.equal(true);
  });

  it('GET /info/post/:postid', async () => {
    const post = await Post.create({ title: 'testpost', content: 'what?' });
    const postId = post._id;
    const res = await req.get(`/info/post/${postId}`).expect(200);
    expect(res.body).to.include({ title: 'testpost' });
  });

  it('POST /info/post', async () => {
    const newPost = {
      title: 'title-test',
      content: 'content-test',
    };
    const posted = await req
      .post('/info/post')
      .set('Authorization', `Bearer ${token}`)
      .send(newPost)
      .expect(200);
    const post = await Post.findOne({ _id: posted.body._id });
    expect(post).to.include(newPost);
    await req
      .post('/info/post')
      .set('Authorization', `Bearer ${token}`)
      .send({})
      .expect(422);

    // polluted property should not be found from database
    const polluted = await req
      .post('/info/post')
      .set('Authorization', `Bearer ${token}`)
      .send({ title: 'fileupload', content: 'fileupload', polluted: true })
      .expect(200);
    expect(polluted.body).not.to.contain({ polluted: true });

    // images should be properly added when needed
    const uploaded = await req
      .post('/info/post')
      .set('Authorization', `Bearer ${token}`)
      .send({
        title: 'fileupload',
        content: 'fileupload',
        images: ['imageurl'],
      })
      .expect(200);
    expect(uploaded.body.images[0]).to.equal('imageurl');
  });

  it('DELETE /info/post/:postid', async () => {
    const postId = (await Post.findOne())._id;
    const targetPost = await Post.findOne({ _id: postId }); // check if the target post exists
    expect(targetPost).not.to.equal(null);
    await req
      .delete(`/info/post/${postId}`)
      .set('Authorization', `Bearer ${token}`)
      .expect(200);
    const deletedPost = await Post.findOne({ _id: postId });
    expect(deletedPost).to.equal(null);
  });

  it('POST /upload', async () => {
    const upload = await req
      .post('/upload')
      .set('Authorization', `Bearer ${token}`)
      .attach('file', path.join(__dirname, 'test.png'))
      .expect(200);
    const filenames = upload.body;
    expect(filenames[0]).to.match(/.+\.png/i);
    await req.get(`/public/${filenames[0]}`).expect(200);
    await removeTempFile(filenames[0]);
  });

  it('PATCH /info/post', async () => {
    const post = await Post.create({ title: 'xxx', content: 'xxx' });
    const newPost = {
      _id: post._id.toString(),
      title: 'ooo',
      content: 'ooo',
    };
    const patched = await req
      .patch('/info/post')
      .set('Authorization', `Bearer ${token}`)
      .send(newPost)
      .expect(200);
    expect(patched.body).to.contain({ title: newPost.title, content: newPost.content });
    expect(await Post.findById(post._id)).to.contain({ title: newPost.title, content: newPost.content });
    await req
      .patch('/info/post')
      .set('Authorization', 'Bearer 12344535693aced')
      .send(newPost)
      .expect(401);
  });

  it('GET /info/stacks', async () => {
    const stackLength = await Stack.find({}).countDocuments();
    let stacks = await req.get('/info/stacks').expect(200);
    expect(stacks.body.length).to.equal(stackLength);
    await Stack.create({ name: 'test1', desc: '...' });
    await Stack.create({ name: 'test2', desc: '...' });
    stacks = await req.get('/info/stacks?search=test').expect(200);
    expect(stacks.body.length).to.equal(2);
    stacks = await req.get('/info/stacks?search=1').expect(200);
    expect(stacks.body.length).to.equal(1);
  });

  it('POST /info/stack', async () => {
    const stackData = {
      name: 'javascript',
      desc: 'javascript is good',
    };
    const stack = await req
      .post('/info/stack')
      .set('Authorization', `Bearer ${token}`)
      .send(stackData)
      .expect(200);
    const newStack = await Stack.findOne({ _id: stack.body._id });
    expect(newStack).to.contain(stackData);
    await req
      .post('/info/stack')
      .send(stackData)
      .expect(401);
    await req
      .post('/info/stack')
      .set('Authorization', `Bearer ${token}`)
      .send({ desc: 's' })
      .expect(422);
  });

  it('DELETE /info/stack/:stackid', async () => {
    const stackId = (await Stack.create({ name: 'test', desc: 'opioid' }))._id;
    await req
      .delete(`/info/stack/${stackId}`)
      .set('Authorization', `Bearer ${token}`)
      .expect(200);
    const removed = await Stack.findById(stackId);
    expect(removed).to.equal(null);
  });

  it('PATCH /info/stack/:stackid', async () => {
    const stackId = (await Stack.findOne())._id;
    const newStack = {
      _id: stackId.toString(),
      name: 'oh halala',
      desc: 'hilolo!'
    };
    const patched = await req
      .patch('/info/stack')
      .set('Authorization', `Bearer ${token}`)
      .send(newStack)
      .expect(200);
    expect(patched.body).to.contain({ name: newStack.name, desc: newStack.desc });
    expect(await Stack.findById(stackId)).to.contain({ name: newStack.name, desc: newStack.desc });
  });
});
