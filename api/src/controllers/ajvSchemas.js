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

// schema for general pagination
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

// schema for work pagination
export const workOptsSchema = {
  ...optsSchema,
  populate: {
    type: 'boolean',
    default: false,
  },
  stacks: {
    type: 'string',
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
  relatedStacks: {
    type: 'array',
    items: { type: 'string' },
    uniqueItems: true,
  },
};
