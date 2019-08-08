export interface POST_ACTIONS {
  SET_LATEST: string;
  SET_POSTS: string;
  SET_POST: string;
  PUT_COMMENT: string;
  DELETE_COMMENT: string;
  INIT_POSTS: string;
  SET_PAGE: string;
}

export interface postData {
  title: string;
  content: string;
  images: [string];
}


export as namespace PostTypes;