import React from 'react';

const PostBadge = props => {
  const { postTitle, updated } = props;
  return <div>post badge - {postTitle} / {JSON.stringify(updated)}</div>;
};

export default PostBadge;
