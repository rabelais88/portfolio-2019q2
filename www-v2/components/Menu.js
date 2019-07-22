import ActiveLink from './ActiveLink';
import env from '../env-vars'

const Menu = props => {
  return (
    <nav>
      <ActiveLink href="/">main</ActiveLink>
      <ActiveLink href="/page2">page2</ActiveLink>
    </nav>
  );
};

export default Menu;
