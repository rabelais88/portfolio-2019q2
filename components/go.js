import Link from 'next/link';
import { withRouter } from 'next/router';

const Go = ({ to, children, router, force }) => {
  const classes = router.pathname === to ? 'link active' : 'link';
  if (force) {
    return <a className={classes} href={to}>{children}</a>
  }
  return (
    <Link prefetch href={to}>
      <a className={classes}>{children}</a>
    </Link>
  );
};

export default withRouter(Go);
