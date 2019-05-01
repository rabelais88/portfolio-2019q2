// @babel/node is not meant for production
// this part will only be used for initial setup
import mongoose from 'mongoose';
import prompts from 'prompts';
import Admin from './models/Admin';

require('dotenv').config();

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true });

mongoose.connection.on('connected', () => {
  console.log('Connected to database');
});
mongoose.connection.on('error', err => {
  console.log(`Database error: ${err}`);
});

const mainProc = async () => {
  const questions = [
    { type: 'text', message: 'enter your email:', name: 'email' },
    { type: 'password', message: 'enter your password:', name: 'password' },
    { type: 'text', message: 'enter your name', name: 'username' },
  ];
  const { email, password, username } = await prompts(questions);
  console.log('accepted input:', email);
  if (Admin.findOne({ email })) {
    console.log('user with same email already exists');
    process.exit(0);
  }
  await Admin.create({ email, password, username });
  console.log('your db has been set up.');
  process.exit(1);
};

mainProc();
