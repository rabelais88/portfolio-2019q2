import _get from 'lodash/get';

import Info from '../models/Info';
import Post from '../models/Post';

/**
 * returns index page markdown
 * @param {Request} [req]
 * @param {Response} [res]
 * @param {Function} [next]
 */
export const infoIndex = async (req, res, next) => {
  const indexMarkdown = await Info.getIndex();
  console.log('controllers/info.js : index requested - ', indexMarkdown);
  res.status(200).json({ indexMarkdown });
};

/**
 * returns stacks list
 * @param {Request} [req]
 * @param {Response} [res]
 * @param {Function} [next]
 */
export const infoStacks = async (req, res, next) => {
  const stacks = await Info.getStacks();
  console.log('controllers/info.js : stack requested - ', stacks);
  res.status(200).json({ stacks });
};

export const infoSetIndex = async (req, res, next) => {
  const indexMarkdown = _get(req, 'body.indexMarkdown');
  if (!indexMarkdown || indexMarkdown === '')
    return res.status(400).json({ message: 'wrong index request' });
  await Info.updateIndex(indexMarkdown);
  res.status(200).json({ indexMarkdown });
};

export const infoSetStacks = async (req, res, next) => {
  const stacks = _get(req, 'body.stacks');
  if (!stacks || !Array.isArray(stacks))
    return res.status(400).json({ message: 'wrong stack request' });
  await Info.updateStacks(stacks);
  res.status(200).json({ stacks });
};

export const infoCreatePost = async (req, res, next) => {
  const post = _get(req, 'body');
  if (!post) return res.status(400).json({ message: 'wrong post request' });
  await Post.create(post);
  res.status(200).json({ post });
};
