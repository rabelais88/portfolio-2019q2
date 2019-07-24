import _get from 'lodash/get';

import Info from '../models/Info';
import Stack from '../models/Stack';
import { checkSchema } from '../util';
import {
  stackSchema,
} from './ajvSchemas';

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
