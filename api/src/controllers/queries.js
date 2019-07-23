const limitMax = 30;
const uploadMax = 15;

export const postSchema = {
  _id: {
    type: 'string',
    minLength: 3,
  },
  title: {
    type: 'string',
    minLength: 3,
  },
  content: {
    type: 'string',
    minLength: 3,
  },
  images: {
    type: 'array',
    maxItems: uploadMax,
    uniqueItems: true,
  },
};

export const optsSchema = {
  limit: {
    type: 'number',
    minimum: 1,
    maximum: limitMax,
  },
  page: {
    type: 'number',
    minimum: 1,
  },
};

export const sortSchema = {
  sortfield: {
    type: 'string',
    enum: ['title', 'content', 'createdAt', 'updatedAt'],
  },
  sortdirection: {
    type: 'string',
    enum: ['asc', 'desc'],
  },
};

export const stackSchema = {
  _id: {
    type: 'string',
    minLength: 3,
  },
  name: {
    type: 'string',
    minLength: 2,
  },
  desc: {
    type: 'string',
  },
  icon: {
    type: 'string',
  },
};

export const workSchema = {
  _id: {
    type: 'string',
    minLength: 3,
  },
  title: {
    type: 'string',
    minLength: 2,
  },
  caption: {
    type: 'string',
    minLength: 2,
  },
  url: {
    type: 'string',
  },
  images: {
    type: 'array',
    maxItems: uploadMax,
    uniqueItems: true,
  },
};
