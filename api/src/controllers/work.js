import _mapValues from 'lodash/mapValues';
import _omit from 'lodash/omit';

import WorkModel from '../models/Work';
import { workSchema, optsSchema, sortSchema } from './ajvSchemas';
import { checkSchema } from '../util';

// /info/posts?limit=10&page=1&sortfield=title&sortdirection=asc
export const getWorks = async (req, res, next) => {
  const { limit, page, sortfield, sortdirection } = req.query;

  // validate pagination
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
    'relatedStacks',
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
  await WorkModel.findByIdAndDelete(workId);
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

export const getWork = async (req, res, next) => {
  if (!req.params.workid || req.params.workid === '')
    return res.status(422).json('wrong work id');
  const work = await WorkModel.findById(req.params.workid);
  res.status(200).json(work);
};
