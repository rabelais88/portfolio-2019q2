import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';

import passport from 'passport';
import { BasicStrategy } from 'passport-http';
import { Strategy as JwtStrategy, ExtractJwt } from 'passport-jwt';

import _get from 'lodash/get';

import { allowCors } from '../../shared/middlewares';
import router from './router';
import Admin from './models/Admin';
import { pageNotFound, errorHandler } from './controllers/error';

require('dotenv').config();

const port = parseInt(process.env.PORT, 10) || 4000;
const dev = process.env.NODE_ENV !== 'production';

const app = express();

if (process.env.NODE_ENV === 'development') {
  app.use(allowCors);
  app.use((req, res, next) => {
    console.log(req.headers);
    next();
  });
}

passport.use(
  new BasicStrategy((username, password, done) => {
    // username should be email
    Admin.login(username, password)
      .then(adminInfo => {
        if (!adminInfo) return done(null, false);
        return done(null, adminInfo);
      })
      .catch(err => done(err));
  }),
);
const jwtOpts = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.JWT_SECRET,
};
passport.use(
  new JwtStrategy(jwtOpts, (jwtPayload, done) => {
    console.log(jwtPayload);
    if (!jwtPayload) return done(null, false); // failed without reason
    return done(null, jwtPayload);
  }),
);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(router);

app.use('*', pageNotFound);
app.use(errorHandler);

if (process.env.NODE_ENV !== 'test') {
  mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useCreateIndex: true,
  });
  mongoose.connection.on('connected', () => {
    console.log('> Connected to database');
  });
  mongoose.connection.on('error', err => {
    console.log(`> Database error: ${err}`);
  });
  app.listen(port, () => {
    console.log(`> API server is now listening to ...${port}`);
  });
}

export default app;
