import _get from 'lodash/get';
import _omit from 'lodash/omit';
import _mapValues from 'lodash/mapValues';
import { ObjectID } from 'mongoose';

import Info from '../models/Info';
import Post from '../models/Post';
import Stack from '../models/Stack';
import WorkModel from '../models/Work';
import { checkSchema } from '../util';
import {
  postSchema,
  optsSchema,
  stackSchema,
  sortSchema,
  workSchema,
} from './queries';

/**
 * returns index page markdown
 * @param {Request} [req]
 * @param {Response} [res]
 * @param {Function} [next]
 */
export const getIntro = async (req, res, next) => {
  const intro = await Info.getIntro();
  res.status(200).json(intro); // returns string
};

/**
 * returns stacks list
 * @param {Request} [req]
 * @param {Response} [res]
 * @param {Function} [next]
 */
export const getStacks = async (req, res, next) => {
  let query = {};
  if (req.query.search) {
    const rgx = new RegExp(req.query.search, 'ig');
    query = {
      $or: [{ name: { $regex: rgx } }, { desc: { $regex: rgx } }],
    };
  }
  const stacks = await Stack.find(query);
  res.status(200).json(stacks); // [] returns array
};

export const getStack = async (req, res, next) => {
  const stackId = _get(req, 'body.id');
  const stack = await Stack.findById(stackId);
  return res.status(200).json(stack);
};

export const setStack = async (req, res, next) => {
  const stack = req.body;
  const checked = checkSchema(stackSchema, stack, ['name', 'desc']);
  if (!checked.isValid) return res.status(422).json(checked.errors);
  const stackData = await Stack.findByIdAndUpdate(
    stack._id,
    { $set: checked.value },
    { new: true },
  );
  res.status(200).json(stackData);
};

export const createStack = async (req, res, next) => {
  const stack = req.body;
  const checked = checkSchema(stackSchema, stack, ['name']);
  if (!checked.isValid) return res.status(422).json(checked.errors);
  const newStack = await Stack.create(checked.value);
  res.status(200).json(newStack);
};

export const deleteStack = async (req, res, next) => {
  const stackId = req.params.stackid;
  await Stack.findByIdAndDelete(stackId);
  res.status(200).json('success');
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

// /info/posts?limit=10&page=1&sortfield=title&sortdirection=asc
export const getWorks = async (req, res, next) => {
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
  mergedOpts.select = [
    'title',
    'id',
    'caption',
    'url',
    'createdAt',
    'updatedAt',
    'images',
  ];

  const sort = {};
  if (sortfield && sortdirection) {
    sort[checkedSort.value.sortfield] = checkedSort.value.sortdirection;
    mergedOpts.sort = sort;
  }

  const works = await WorkModel.paginate(q, mergedOpts);
  res.status(200).json(works);
};

export const createWork = async (req, res, next) => {
  let work = req.body;
  if (!work) return res.status(400).json({ message: 'wrong post request' });
  const checked = checkSchema(workSchema, work, ['title', 'caption']);
  if (!checked.isValid) return res.status(422).json(checked.errors);
  work = await WorkModel.create(checked.value);
  res.status(200).json(work);
};

export const deleteWork = async (req, res, next) => {
  const workId = req.params.workid;
  if (!workId)
    return res
      .status(400)
      .json({ message: 'target id for deletion is missing' });
  await Post.findByIdAndDelete(workId);
  res.status(200).json('success');
};

export const setWork = async (req, res, next) => {
  const work = req.body;
  if (!work) return res.status(400).json({ message: 'wrong post mod request' });
  const checked = checkSchema(workSchema, work, ['title', 'caption', '_id']);
  if (!checked.isValid) return res.status(422).json(checked.errors);
  const workData = await WorkModel.findByIdAndUpdate(
    work._id,
    { $set: checked.value },
    { new: true },
  );
  res.status(200).json(workData);
};
