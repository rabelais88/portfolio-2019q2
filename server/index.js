import express from 'express';
import next from 'next';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import mongoose from 'mongoose';

import { validateHeaderToken, allowCORS } from './controllers/handlers';
import { tokenValidated, login } from './controllers/auth';
import { infoIndex, infoSetIndex, infoStacks, infoSetStacks, infoCreatePost } from './controllers/info';
import { indexProvider } from './controllers/dataprovider';

require('dotenv').config(); // injects to process.env.~

const server = express();
const port = parseInt(process.env.PORT, 10) || 3000;
const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true });

mongoose.connection.on('connected', () => {
  console.log('Connected to database');
});
mongoose.connection.on('error', err => {
  console.log(`Database error: ${err}`);
});

if (process.env.NODE_ENV === 'development') {
  server.use(allowCORS);
}

server.use(bodyParser.json());
server.use(bodyParser.urlencoded({ extended: true }));
server.use(cookieParser());

server.get('/', indexProvider);

server.get('/a', (req, res) => {
  return app.render(req, res, '/a', req.query);
});

server.get('/b', (req, res) => {
  return app.render(req, res, '/b', req.query);
});

server.get('/posts/:id', (req, res) => {
  return app.render(req, res, '/posts', { id: req.params.id });
});

server.post('/auth', login);
server.get('/auth', validateHeaderToken, tokenValidated(app)); // token ping
server.get('/info-index', validateHeaderToken, infoIndex);
server.patch('/info-index', validateHeaderToken, infoSetIndex);
server.get('/info-stacks', validateHeaderToken, infoStacks);
server.patch('/info-index', validateHeaderToken, infoSetStacks);
server.post('/info-post', validateHeaderToken, infoCreatePost);

server.get('*', (req, res) => {
  return handle(req, res);
});

app.prepare().then(() => {
  server.listen(port, err => {
    if (err) throw err;
    console.log(`> Ready on http://localhost:${port}`);
  });
});
