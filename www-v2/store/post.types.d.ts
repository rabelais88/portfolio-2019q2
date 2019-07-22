export interface POST_ACTIONS {
  GET_LATEST: string;
  GET_PAGE: string;
  GET_POST: string;
  PUT_COMMENT: string;
  DELETE_COMMENT: string;
  INIT_POSTS: string;
}

export interface postData {
  title: string;
  content: string;
  images: [string];
}


export as namespace PostTypes;