// https://github.com/zeit/next.js/#userouter
import { useRouter } from 'next/router';

export default function ActiveLink({ children, href }) {
  const router = useRouter();
  const menuProps = router.pathname === href ? { className: 'active' } : null;

  const handleClick = e => {
    e.preventDefault();
    router.push(href);
  };

  return (
    <a href={href} onClick={handleClick} {...menuProps}>
      {children}
    </a>
  );
}
