import { useState, useRef } from 'react';
import { useSpring, animated, config, useTrail } from 'react-spring';
import ActiveLink from './ActiveLink';

const Menu = _props => {
  const [menuVisibility, setMenuVisibility] = useState(false);
  const menus = {
    HOME: '/',
    WORKS: '/works',
    POSTS: '/posts',
    CONTACT: '/contact',
  };
  const menuEntries = Object.entries(menus).map(m => ({
    key: m[0],
    val: m[1],
  }));

  const delay = durationMS => {
    return new Promise((resolve, reject) => {
      setTimeout(() => resolve(), durationMS);
    });
  };

  // note to self: supposed to use .useChain of react-spring
  // but useRef() fails on next.js
  // animation for react-spring
  const menuAnim = useSpring({
    config: config.default,
    // from === default value
    from: {
      transform: 'translate(100%)',
    },
    to: async (next, cancel) => {
      if (menuVisibility) return next({ transform: 'translate(0%)' });
      await delay(400);
      return next({ transform: 'translate(100%)' });
    },
  });

  const menuItemAnim = useTrail(menuEntries.length, {
    config: config.default,
    // from === default value
    from: {
      height: '0px',
      transform: 'translate3d(0, 100px, 0)',
      opacity: 0,
    },
    to: async (next, cancel) => {
      if (menuVisibility) {
        await delay(300);
        return next({
          height: '100px',
          transform: 'translate3d(0, 0px, 0)',
          opacity: 1,
        });
      }
      return next({
        height: '0px',
        transform: 'translate3d(0, 100px, 0)',
        opacity: 0,
      });
    },
  });

  return (
    <nav id="menu">
      <button onClick={() => setMenuVisibility(!menuVisibility)}>
        <img src="/static/images/icon-menu.svg" alt="icon-menu" />
      </button>
      <animated.ul id="menu-expanded" style={menuAnim}>
        {menuItemAnim.map((style, index) => {
          const { transform, height, opacity } = style;
          // console.log(index, style);
          return (
            <animated.li
              key={menuEntries[index].key}
              style={{ transform, opacity }}
            >
              <ActiveLink href={menuEntries[index].val} style={{ height }}>
                {menuEntries[index].key}
              </ActiveLink>
            </animated.li>
          );
        })}
      </animated.ul>
    </nav>
  );
};

export default Menu;
