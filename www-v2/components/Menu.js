import { useState, useRef } from 'react';
import { useSpring, animated, config, useTrail } from 'react-spring';
import ActiveLink from './ActiveLink';

const Menu = _props => {
  const [menuVisibility, setMenuVisibility] = useState(false);
  console.log('menuvisibility', menuVisibility);
  const menus = {
    HOME: '/',
    WORKS: '/works',
    POSTS: '/posts',
    CONTACT: '/contact',
  };

  const delay = durationMS => {
    return new Promise((resolve, reject) => {
      setTimeout(() => resolve(), durationMS);
    });
  };

  // animation for react-spring
  const menuAnim = useSpring({
    config: config.default,
    to: async (next, cancel) => {
      if (menuVisibility) return next({ transform: 'translate(0%)' });
      await delay(400);
      return next({ transform: 'translate(100%)' });
    },
  });

  // const menuItemAnim = useTrail({});

  return (
    <nav id="menu">
      <button onClick={() => setMenuVisibility(!menuVisibility)}>
        <img src="/static/images/icon-menu.svg" alt="icon-menu" />
      </button>
      <animated.ul id="menu-expanded" style={menuAnim}>
        <li>
          <ActiveLink href="/">HOME</ActiveLink>
        </li>
      </animated.ul>
    </nav>
  );
};

export default Menu;
