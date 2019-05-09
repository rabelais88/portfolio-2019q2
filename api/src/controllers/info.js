import _get from 'lodash/get';

import Info from '../models/Info';
import Post from '../models/Post';
import Stack from '../models/Stack';

/**
 * returns index page markdown
 * @param {Request} [req]
 * @param {Response} [res]
 * @param {Function} [next]
 */
export const getIndex = async (req, res, next) => {
  const indexMarkdown = await Info.getIndex();
  console.log('controllers/info.js : index requested - ', indexMarkdown);
  res.status(200).json(indexMarkdown); // returns string
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
}

export const deleteStack = async (req, res, next) => {
  const stackId = _get(req, 'body.id');
  console.log('controllers/info.js : stack delete requested', stackId);
  await Stack.remove({ id: stackId });
  res.status(200);
};

export const setIndex = async (req, res, next) => {
  const indexMarkdown = _get(req, 'body.indexMarkdown');
  if (!indexMarkdown || indexMarkdown === '')
    return res.status(400).json({ message: 'wrong index request' });
  await Info.updateIndex(indexMarkdown);
  res.status(200).json(indexMarkdown);
};

export const createPost = async (req, res, next) => {
  const post = req.body;
  if (!post) return res.status(400).json({ message: 'wrong post request' });
  await Post.create(post);
  res.status(200).json(post);
};

export const deletePost = async (req, res, next) => {
  const postId = _get(req, 'body.id');
  if (!postId) return res.status(400).json({ message: 'wrong post deletion request' });
  console.log('controllers/info.js : post delete requested', postId);
  await Post.remove({ id: postId });
  res.status(200);
};

export const setPost = async (req, res, next) => {
  const post = req.body;
  if (!post) return res.status(400).json({ message: 'wrong post mod request' });
  console.log('controllers/info.js : post set requested', post);
  let postData = await Post.findOne({ id: post.id });
  postData = { ...postData, post };
  postData.save();
  res.status(200).json(postData);
};