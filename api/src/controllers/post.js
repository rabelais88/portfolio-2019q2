import _mapValues from 'lodash/mapValues';
import _omit from 'lodash/omit';

import Post from '../models/Post';
import { postSchema, optsSchema, sortSchema } from './ajvSchemas';
import { checkSchema } from '../util';

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
  await Post.findByIdAndDelete(postId);
  res.status(200).json('success');
};

export const setPost = async (req, res, next) => {
  const post = req.body;
  if (!post) return res.status(400).json({ message: 'wrong post mod request' });
  const checked = checkSchema(postSchema, post, ['title', 'content', '_id']);
  if (!checked.isValid) return res.status(422).json(checked.errors);
  const postData = await Post.findByIdAndUpdate(
    post._id,
    { $set: checked.value },
    { new: true },
  );
  res.status(200).json(postData);
};

// /info/posts?limit=10&page=1&sortfield=title&sortdirection=asc
export const getPosts = async (req, res, next) => {
  const { limit, page, sortfield, sortdirection } = req.query;

  // validate pagination options
  const opts = { limit, page };
  const checked = checkSchema(optsSchema, opts, ['page', 'limit']);
  if (!checked.isValid) return res.status(422).json(checked.errors);

  // validate sort options
  const sortOpts = { sortfield, sortdirection };
  const checkedSort = checkSchema(sortSchema, sortOpts);
  if (!checkedSort.isValid) return res.status(422).json(checkedSort.errors);

  // removes all other options, and add regex queries
  const rawQ = _omit(req.query, [
    'limit',
    'page',
    'sortfield',
    'sortdirection',
  ]);
  const q = _mapValues(rawQ, v => new RegExp(v, 'ig'));
  const mergedOpts = checked.value;
  mergedOpts.select = ['title', 'id', 'createdAt', 'updatedAt'];

  const sort = {};
  if (sortfield && sortdirection) {
    sort[checkedSort.value.sortfield] = checkedSort.value.sortdirection;
    mergedOpts.sort = sort;
  }

  const posts = await Post.paginate(q, mergedOpts);
  res.status(200).json(posts);
};

export const getPost = async (req, res, next) => {
  if (!req.params.postid || req.params.postid === '')
    return res.status(422).json('wrong post id');
  const post = await Post.findById(req.params.postid);
  res.status(200).json(post);
};
