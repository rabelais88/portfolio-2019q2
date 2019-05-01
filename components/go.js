import Link from 'next/link';
import { withRouter } from 'next/router';

const Go = ({ to, children, router }) => {
  const classes = router.pathname === to ? 'link active' : 'link';
  return (
    <Link href={to}>
      <a className={classes}>{children}</a>
    </Link>
  );
};

export default withRouter(Go);
