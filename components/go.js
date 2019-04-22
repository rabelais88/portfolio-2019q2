import Link from 'next/link';

export default ({ to, children }) => {
  return (
    <Link href={to}>
      <a>{children}</a>
    </Link>);
}