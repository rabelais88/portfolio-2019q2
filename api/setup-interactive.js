// @babel/node is not meant for production
// this part will only be used for initial setup
import mongoose from 'mongoose';
import prompts from 'prompts';
import Admin from './src/models/Admin';

require('dotenv').config();

const { ADMIN_EMAIL, ADMIN_PASSWORD, ADMIN_NAME, MONGO_URI } = process.env;

mongoose.connect(MONGO_URI, { useNewUrlParser: true, useCreateIndex: true });

mongoose.connection.on('error', err => {
  console.log('Database error', err, 'please launch mongodb first');
  process.exit(1);
});

const mainProcessDev = async () => {
  const questions = [
    { type: 'text', message: 'enter your email:', name: 'email' },
    { type: 'password', message: 'enter your password:', name: 'password' },
    { type: 'text', message: 'enter your name', name: 'username' },
  ];
  const { email, password, username } = await prompts(questions);
  console.log('accepted input:', email);
  const isEmailTaken = await Admin.findOne({ email });
  if (isEmailTaken) {
    console.log('user with same email already exists', isEmailTaken);
    process.exit(1);
  }
  await Admin.create({ email, password, username });
  console.log('your db has been set up.');
  process.exit(0);
};

const mainProcessProd = async () => {
  if (!ADMIN_EMAIL || !ADMIN_PASSWORD || !ADMIN_NAME) {
    console.log('provide your info as ADMIN_EMAIL, ADMIN_PASSWORD, ADMIN_NAME via environment in production mode');
    process.exit(1);
  }
  const isEmailTaken = await Admin.findOne({ email: ADMIN_EMAIL });
  if (isEmailTaken) {
    console.log('user with same email already exists', isEmailTaken);
    process.exit(1);
  }
  await Admin.create({ email: ADMIN_EMAIL, password: ADMIN_PASSWORD, name: ADMIN_NAME });
  console.log('your db has been set up');
  process.exit(0);
};

if (process.env.NODE_ENV === 'development') mainProcessDev();
if (process.env.NODE_ENV === 'production') mainProcessProd();
