// @babel/node is not meant for production
// this part will only be used for initial setup
require('dotenv').config();
import mongoose from 'mongoose';
import Admin from './models/Admin';
import prompts from 'prompts';

mongoose.connect(process.env.MONGO_URI, {useNewUrlParser: true});

const mainProc = async () => {
  const questions = [
    {type: 'text', message: 'enter your email:', name: 'email'},
    {type: 'password', message: 'enter your password:', name: 'password'},
    {type: 'text', message: 'enter your name', name: 'username'}
  ];
  const {email, password, username} = await prompts(questions);
  console.log('accepted input:', email);
  if (Admin.findOne({email})) {
    console.log('user with same email already exists');
    process.exit(0);
  }
  await Admin.create({email, password, username});
  console.log('your db has been set up.');
  process.exit(1);
};

mainProc();