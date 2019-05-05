import express from 'express';
import { login, validateHeaderToken, tokenValidated } from './auth';
import { infoIndex, infoSetIndex, infoSetStacks, infoStacks, infoCreatePost } from './info';
import passport from 'passport';

const router = express.Router();

const authBasic = passport.authenticate('basic', {session: false});
const authJwt = passport.authenticate('jwt', { session: false });

router.post('/auth', authBasic, login);
router.get('/auth', authJwt, tokenValidated);

router.get('/info/index', infoIndex);
router.patch('/info/index', authJwt, infoSetIndex);
router.get('/info/stacks', infoStacks);
router.patch('/info/stacks', authJwt, infoSetStacks);
router.post('/info-post', authJwt, infoCreatePost);

export default router;