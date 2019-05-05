import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import { allowCors } from '../../shared/middlewares';
import router from './controllers';
import passport from 'passport';
import { BasicStrategy } from 'passport-http';
import { Strategy as JwtStrategy, ExtractJwt } from 'passport-jwt';
import Admin from './models/Admin';
import _get from 'lodash/get';
import { pageNotFound, errorHandler } from './controllers/error';


require('dotenv').config();

const port = parseInt(process.env.PORT, 10) || 4000;
const dev = process.env.NODE_ENV !== 'production';

const app = express();

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useCreateIndex: true });

mongoose.connection.on('connected', () => {
  console.log('> Connected to database');
});
mongoose.connection.on('error', err => {
  console.log(`> Database error: ${err}`);
});

if (process.env.NODE_ENV === 'development') {
  app.use(allowCors);
};

passport.use(new BasicStrategy((username, password, done) => {
  // username should be email
  Admin.login(username, password).then(adminInfo => {
    if (!adminInfo) return (null, false);
    return done(null, adminInfo);
  }).catch(err => done(err));
}));
const jwtOpts = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.JWT_SECRET
}
passport.use(new JwtStrategy(jwtOpts, (jwtPayload, done) => {
  console.log(jwtPayload)
  if (!jwtPayload) return done(null, false); // failed without reason
  return done(null, jwtPayload);
}));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(router);

app.use('*', pageNotFound);
app.use(errorHandler);

app.listen(port, () => {
  console.log(`> API server is now listening to ...${port}`);
});