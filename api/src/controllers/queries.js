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