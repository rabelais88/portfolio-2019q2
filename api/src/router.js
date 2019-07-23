import express from 'express';
import passport from 'passport';
import { login, tokenValidated } from './controllers/auth';
import {
  getIntro,
  setIntro,
  setStack,
  createStack,
  deleteStack,
  getStacks,
  getStack,
  createPost,
  deletePost,
  setPost,
  getPosts,
  getPost,
  getWorks,
  createWork,
  deleteWork,
  setWork,
} from './controllers/info';
import { upload, uploadImages } from './controllers/upload';

const router = express.Router();

const authBasic = passport.authenticate('basic', { session: false });
const authJwt = passport.authenticate('jwt', { session: false });

router.post('/auth', authBasic, login);
router.get('/auth', authJwt, tokenValidated);

router.get('/info/intro', getIntro);
router.patch('/info/intro', authJwt, setIntro);

router.get('/info/stacks', getStacks); // info/stacks?search=regex
router.delete('/info/stack/:stackid', authJwt, deleteStack);
router.get('/info/stack/:stackid', getStack);
router.patch('/info/stack', authJwt, setStack);
router.post('/info/stack', authJwt, createStack);

router.post('/info/post', authJwt, createPost);
router.delete('/info/post/:postid', authJwt, deletePost);
router.patch('/info/post', authJwt, setPost);
router.get('/info/post/:postid', getPost);
router.get('/info/posts', getPosts); // info/posts?page=1&limit=10&title=regex
router.post('/upload', authJwt, upload.array('file', 15), uploadImages);

router.get('/info/works', getWorks); // info/works?page=1&limit=10&title=regex
router.post('/info/work', authJwt, createWork);
router.delete('/info/work/:workid', authJwt, deleteWork);
router.patch('/info/work', authJwt, setWork);

export default router;
