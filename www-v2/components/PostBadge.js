import React from 'react';
import PropTypes from 'prop-types';

const PostBadge = props => {
  const { postTitle, updated } = props;
  return (
    <div>
      post badge - {postTitle} / {JSON.stringify(updated)}
    </div>
  );
};

PostBadge.defaultProps = {
  postTitle: '...',
  updated: new Date(),
};

PostBadge.propTypes = {
  postTitle: PropTypes.string,
  updated: PropTypes.instanceOf(Date),
};

export default PostBadge;
