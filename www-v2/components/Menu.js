import { useState, useRef, useEffect } from 'react';
import { useSpring, animated, config, useTrail } from 'react-spring';
import ActiveLink from './ActiveLink';

const Menu = _props => {
  const [menuVisibility, setMenuVisibility] = useState(false);

  useEffect(() => {
    console.log('chaning menu visibility');
    document.body.style.overflowY = menuVisibility ? 'hidden' : 'scroll';
  }, [menuVisibility]);

  const menus = {
    HOME: '/',
    WORKS: '/works',
    POSTS: '/posts',
    CONTACT: '/contact',
    links: null, // for displaying misc. links
    title: null,
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

  const Links = (
    <div className="menu--link-icons">
      <a href="https://github.com/rabelais88">
        <img src="/static/images/icon-github.svg" alt="github icon" />
      </a>
      <a href="https://instagram.com/rabelais">
        <img src="/static/images/icon-instagram.svg" alt="instagram icon" />
      </a>
      <a href="https://codepen.io/rabelais">
        <img src="/static/images/icon-codepen.svg" alt="codepen icon" />
      </a>
      <a href="https://www.linkedin.com/in/sungryeol-park-958861b8/">
        <img src="/static/images/icon-linkedin.svg" alt="linkedin icon" />
      </a>
    </div>
  );

  return (
    <nav id="menu">
      <button onClick={() => setMenuVisibility(!menuVisibility)}>
        <div id="nav-icon2" className={menuVisibility ? 'open' : ''}>
          <span />
          <span />
          <span />
          <span />
          <span />
          <span />
        </div>
        {/* <img src="/static/images/icon-menu.svg" alt="icon-menu" /> */}
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
              {index < menuEntries.length - 2 && (
                <ActiveLink href={menuEntries[index].val} style={{ height }}>
                  {menuEntries[index].key}
                </ActiveLink>
              )}
              {index === menuEntries.length - 2 && Links}
              {index === menuEntries.length - 1 && (
                <p>sungryeol&apos;s portfolio</p>
              )}
            </animated.li>
          );
        })}
      </animated.ul>
    </nav>
  );
};

export default Menu;
