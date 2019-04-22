require('dotenv').config(); // injects to process.env.~
const express = require('express');
const next = require('next');
const bodyParser = require("body-parser");
const cookieParser = require('cookie-parser');

const port = parseInt(process.env.PORT, 10) || 3000;
const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

// cert should be handled via nginx proxy
// https://www.codementor.io/marcoscasagrande/installing-express-nginx-app-on-ubuntu-18-04-with-ssl-using-certbot-pdt44g5gs

const server = express();
const { authHandler, corsHandler } = require('./controllers/handlers');
const controllers = require('./controllers');

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

server.post('/auth', controllers.login(process.env.JWT_SECRET));
server.get('/auth', authHandler(process.env.JWT_SECRET), controllers.auth(app));

server.get('*', (req, res) => {
  return handle(req, res)
})

app.prepare().then(() => {
  server.listen(port, err => {
    if (err) throw err
    console.log(`> Ready on http://localhost:${port}`)
  })
})