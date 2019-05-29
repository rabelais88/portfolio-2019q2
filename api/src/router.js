import express from 'express';
import { login, validateHeaderToken, tokenValidated } from './controllers/auth';
import {
  getIntro,
  setIntro,
  setStack,
  deleteStack,
  getStacks,
  getStack,
  createPost,
  deletePost,
  setPost,
} from './controllers/info';
import passport from 'passport';

const router = express.Router();

const authBasic = passport.authenticate('basic', { session: false });
const authJwt = passport.authenticate('jwt', { session: false });

router.post('/auth', authBasic, login);
router.get('/auth', authJwt, tokenValidated);

router.get('/info/intro', getIntro);
router.patch('/info/intro', authJwt, setIntro);

router.get('/info/stacks', getStacks);
router.delete('/info/stacks', authJwt, deleteStack);
router.get('/info/stack', getStack);
router.patch('/info/stack', authJwt, setStack);

router.post('/info/post', authJwt, createPost);
router.delete('/info/post', authJwt, deletePost);
router.patch('/info/post', authJwt, setPost);

export default router;
