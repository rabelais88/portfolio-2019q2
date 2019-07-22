// https://github.com/zeit/next.js/#userouter
import { useRouter } from 'next/router';

export default function ActiveLink({ children, href }) {
  const router = useRouter();
  const currentClass = router.pathname === href ? 'active' : '';

  const handleClick = e => {
    e.preventDefault();
    router.push(href);
  };

  return (
    <a href={href} onClick={handleClick} className={currentClass}>
      {children}
    </a>
  );
}
