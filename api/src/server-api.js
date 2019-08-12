import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import path from 'path';
import morgan from 'morgan';

import passport from 'passport';
import { BasicStrategy } from 'passport-http';
import { Strategy as JwtStrategy, ExtractJwt } from 'passport-jwt';

import cors from 'cors';
// import { allowCors } from '../../shared/middlewares';
import router from './router';
import Admin from './models/Admin';
import { pageNotFound, errorHandler } from './controllers/error';

const isTest = process.env.NODE_ENV === 'test';
const envPath = path.join(__dirname, isTest ? '../.env.sample' : '../.env')
require('dotenv').config({ path: envPath, systemvars: true });
// console.log('envPath', envPath);

const port = parseInt(process.env.PORT, 10) || 4000;
const dev = process.env.NODE_ENV !== 'production';

const app = express();
let morganOpt = 'tiny';

console.log('> NODE_ENV?', process.env.NODE_ENV);

const whitelist = process.env.CORS_WHITELIST.split(',');

const corsOptions = {
  origin(origin, callback) {
    if (!origin || whitelist.includes(origin)) {
      callback(null, true);
    } else {
      console.log('origin', origin);
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
};

if (['development', 'test'].includes(process.env.NODE_ENV)) {
  morganOpt = 'dev';
}
app.use(cors(corsOptions));
app.use(morgan(morganOpt));

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
app.use('/public', express.static(path.resolve('upload')));

app.use(router);

app.use('*', pageNotFound);
app.use(errorHandler);

if (process.env.NODE_ENV !== 'test') {
  mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
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
