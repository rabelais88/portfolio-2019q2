import express from 'express';
import next from 'next';
import path from 'path';
// import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';

import { allowCors } from '../../shared/middlewares';

require('dotenv').config(); // injects to process.env.~

const server = express();
const port = parseInt(process.env.PORT, 10) || 3000;
const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

if (process.env.NODE_ENV === 'development') {
  server.use(allowCors);
}

// server.use(bodyParser.json());
// server.use(bodyParser.urlencoded({ extended: true }));
server.use(cookieParser());

// server.get('/', indexProvider(app));

// server.get('/a', (req, res) => {
//   return app.render(req, res, '/a', req.query);
// });

// server.get('/b', (req, res) => {
//   return app.render(req, res, '/b', req.query);
// });

// server.get('/posts/:id', (req, res) => {
//   return app.render(req, res, '/posts', { id: req.params.id });
// });
app.prepare().then(() => {
  server.get('/service-worker.js', (req, res) => {
    const swPath = path.join(__dirname, '..', '.next', 'service-worker.js');
    return app.serveStatic(req, res, swPath);
  });

  server.get('*', (req, res) => {
    return handle(req, res);
  });
  server.listen(port, err => {
    if (err) throw err;
    console.log(`> Ready on http://localhost:${port}`);
  });
});
