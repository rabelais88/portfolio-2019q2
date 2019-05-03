import { withRouter } from 'next/router';
import _get from 'lodash/get';
import { connect } from 'react-redux';
import { useTransition, animated, useSpring } from 'react-spring'

import { logout } from '../actions/user';
import { menuShow } from '../actions/ui';
import Go from './go';

const names = {
  '/': 'HOME',
  '/gallery': 'WORKS',
  '/contact': 'CONTACT',
  '/login': 'ADMIN',
  '/admin': 'ADMIN',
};

const classList = (...classes) => {
  return classes.filter(c => c).join(' ');
};

const Menu = ({ router, user, dispatch, ui }) => {

  const menuTrans = useTransition(ui.menuVisible, null, {
    from: { opacity: 0, right: '-100px' },
    enter: { opacity: 1, right: '0px' },
    leave: { opacity: 0, right: '-100px' },
  });

  const menuSpringBtn = useSpring({
    marginTop: ui.menuVisible ? '130px' : '0px',
  });

  const onLogout = e => {
    e.preventDefault();
    dispatch(logout());
    if (router.pathname === '/admin') router.push('/');
  };

  return (
    <nav id="menu">
      <p>{_get(names, router.pathname, '')}</p>
      {menuTrans.map(
        ({ item, key, props: { right, opacity, marginTop } }) =>
          item && (
            <animated.div
              className="menu--container"
              key={key}
              style={{ opacity, right }}
            >
              <Go to="/">
                <img src="/static/home.svg" alt="home" />
              </Go>
              <Go to="/gallery">
                <img src="/static/file-text.svg" alt="gallery" />
              </Go>
              <Go to="/contact">
                <img src="/static/email.svg" alt="contact" />
              </Go>
              <Go to="/login">
                <img src="/static/cloud-upload.svg" alt="login" />
              </Go>
              {user.auth ? (
                <a href="#" className="link" onClick={onLogout}>
                  <img src="/static/power-outline.svg" alt="logout" />
                </a>
              ) : null}
            </animated.div>
          ),
      )}
      <animated.button
        onClick={e => dispatch(menuShow(!ui.menuVisible))}
        style={menuSpringBtn}
      >
        {ui.menuVisible ? 'close' : 'open'}
      </animated.button>
    </nav>
  );
};

const mapStateToProps = state => state;

export default connect(mapStateToProps)(withRouter(Menu));
