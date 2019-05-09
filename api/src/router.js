import express from 'express';
import { login, validateHeaderToken, tokenValidated } from './controllers/auth';
import { getIndex, setIndex, setStack, deleteStack, getStacks, createPost, deletePost, setPost } from './controllers/info';
import passport from 'passport';

const router = express.Router();

const authBasic = passport.authenticate('basic', {session: false});
const authJwt = passport.authenticate('jwt', { session: false });

router.post('/auth', authBasic, login);
router.get('/auth', authJwt, tokenValidated);

router.get('/info/index', getIndex);
router.patch('/info/index', authJwt, setIndex);
router.get('/info/stacks', getStacks);
router.patch('/info/stacks', authJwt, setStack);
router.delete('/info/stacks', authJwt, deleteStack);
router.post('/info/post', authJwt, createPost);
router.delete('/info/post', authJwt, deletePost);
router.patch('/info/post', authJwt, setPost);

export default router;