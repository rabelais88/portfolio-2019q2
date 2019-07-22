import ActiveLink from './ActiveLink';

const Menu = props => {
  return (
    <nav>
      <ActiveLink href="/">main</ActiveLink>
      <ActiveLink href="/page2">page2</ActiveLink>
    </nav>
  );
};

export default Menu;
