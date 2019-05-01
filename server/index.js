require('dotenv').config(); // injects to process.env.~
import express from 'express';
import next from 'next';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import mongoose from 'mongoose';

const port = parseInt(process.env.PORT, 10) || 3000;
const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

// cert should be handled via nginx proxy
// https://www.codementor.io/marcoscasagrande/installing-express-nginx-app-on-ubuntu-18-04-with-ssl-using-certbot-pdt44g5gs

const server = express();
const { authHandler, corsHandler } = require('./controllers/handlers');
const authControllers = require('./controllers/auth');
import { infoIndex } from './controllers/info';

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true });

if (process.env.NODE_ENV === 'development') {
  server.use(corsHandler);
}

server.use(bodyParser.json());
server.use(bodyParser.urlencoded({ extended: true }));
server.use(cookieParser());

server.get('/a', (req, res) => {
  return app.render(req, res, '/a', req.query)
})

server.get('/b', (req, res) => {
  return app.render(req, res, '/b', req.query)
})

server.get('/posts/:id', (req, res) => {
  return app.render(req, res, '/posts', { id: req.params.id })
})

server.post('/auth', authControllers.login(process.env.JWT_SECRET));
server.get('/auth', authHandler(process.env.JWT_SECRET), authControllers.auth(app)); // token ping
server.get('/info-index', authHandler(process.env.JWT_SECRET), infoIndex(app));

server.get('*', (req, res) => {
  return handle(req, res)
})

app.prepare().then(() => {
  server.listen(port, err => {
    if (err) throw err
    console.log(`> Ready on http://localhost:${port}`)
  })
})