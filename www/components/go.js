import Link from 'next/link';
import { withRouter } from 'next/router';
import { connect } from 'react-redux';
import { enhance } from '../utils';
import { menuShow } from '../actions/ui';

const Go = ({ to, children, router, force, dispatch }) => {
  const beforeMove = () => {
    dispatch(menuShow(false));
  };
  const classes = router.pathname === to ? 'link active' : 'link';
  if (force) {
    return (
      <a className={classes} href={to}>
        {children}
      </a>
    );
  }
  return (
    <Link prefetch href={to}>
      <a className={classes} onClick={beforeMove}>
        {children}
      </a>
    </Link>
  );
};

const mapStateToProps = state => state;
export default enhance(Go, [withRouter, connect(mapStateToProps)]);
