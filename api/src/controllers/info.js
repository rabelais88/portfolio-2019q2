import _get from 'lodash/get';
import _omit from 'lodash/omit';
import _mapValues from 'lodash/mapValues';
import Ajv from 'ajv';

import Info from '../models/Info';
import Post from '../models/Post';
import Stack from '../models/Stack';
import { checkSchema } from '../util';
import { postSchema, optsSchema } from './queries';

/**
 * returns index page markdown
 * @param {Request} [req]
 * @param {Response} [res]
 * @param {Function} [next]
 */
export const getIntro = async (req, res, next) => {
  const intro = await Info.getIntro();
  console.log('controllers/info.js : index requested - ', intro);
  res.status(200).json(intro); // returns string
};

/**
 * returns stacks list
 * @param {Request} [req]
 * @param {Response} [res]
 * @param {Function} [next]
 */
export const getStacks = async (req, res, next) => {
  const stacks = await Stack.find();
  console.log('controllers/info.js : stack requested - ', stacks);
  res.status(200).json(stacks); // [] returns array
};

export const getStack = async (req, res, next) => {
  const stackId = _get(req, 'body.id');
  const stack = await Stack.findOne({ id: stackId });
  return stack;
};

export const setStack = async (req, res, next) => {
  const stack = req.body;
  console.log('controllers/info.js : stack adjust requested', stack);
  let stackData = await Stack.findOne({ id: stack.id });
  stackData = { ...stackData, ...stack };
  await stackData.save();
  res.status(200).json(stackData);
};

export const createStack = async (req, res, next) => {
  const stack = req.body;
  console.log('controllers/info.js : stack create requested', stack);
  await Stack.create(stack);
  res.status(200).json(stack);
};

export const deleteStack = async (req, res, next) => {
  const stackId = _get(req, 'body.id');
  console.log('controllers/info.js : stack delete requested', stackId);
  await Stack.remove({ id: stackId });
  res.status(200);
};

export const setIntro = async (req, res, next) => {
  const intro = _get(req, 'body.intro');
  if (!intro || intro === '')
    return res.status(400).json({ message: 'wrong index request' });
  await Info.updateIndex(intro);
  res.status(200).json(intro);
};

export const createPost = async (req, res, next) => {
  let post = req.body;
  if (!post) return res.status(400).json({ message: 'wrong post request' });
  const checked = checkSchema(postSchema, post, ['title', 'content']);
  if (!checked.isValid) return res.status(422).json(checked.errors);
  post = await Post.create(checked.value);
  res.status(200).json(post);
};

export const deletePost = async (req, res, next) => {
  // const postId = _get(req, 'body.id');
  // if (!postId)
  const postId = req.params.postid;
  if (!postId)
    return res
      .status(400)
      .json({ message: 'target id for deletion is missing' });
  await Post.deleteOne({ _id: postId });
  res.status(200).json('success');
};

export const setPost = async (req, res, next) => {
  const post = req.body;
  console.log('controllers/info.js : post set requested', post);
  if (!post) return res.status(400).json({ message: 'wrong post mod request' });
  const checked = checkSchema(postSchema, post, ['title', 'content', '_id']);
  console.log(checked.errors);
  if (!checked.isValid) return res.status(422).json(checked.errors);
  let postData = await Post.findOne({ _id: post._id });
  console.log('postData', checked.value);
  postData = { ...postData, ...checked.value };
  await postData.save();
  res.status(200).json(postData);
};

export const getPosts = async (req, res, next) => {
  const { limit, page } = req.query;
  const opts = { limit, page };
  const checked = checkSchema(optsSchema, opts, ['page', 'limit']);
  if (!checked.isValid) return res.status(422).json(checked.errors);
  const rawQ = _omit(req.query, ['limit', 'page']);
  const q = _mapValues(rawQ, v => new RegExp(v, 'ig'));
  opts.select = ['title', 'id', 'createdAt', 'updatedAt'];
  const posts = await Post.paginate(q, checked.value);
  res.status(200).json(posts);
};

export const getPost = async (req, res, next) => {
  if (!req.params.postid || req.params.postid === '')
    return res.status(422).json('wrong post id');
  const post = await Post.findOne({ _id: req.params.postid });
  res.status(200).json(post);
};
