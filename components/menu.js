import { withRouter } from 'next/router';
import _get from 'lodash/get';
import { connect } from 'react-redux';
import { Cookies } from 'react-cookie';
import { logout } from '../actions/user';
import Go from './go';

const cookies = new Cookies();

const names = {
  '/': 'HOME',
  '/gallery': 'WORKS',
  '/contact': 'CONTACT',
  '/login': 'ADMIN',
};
const Menu = ({ router, logOut, user }) => {
  const onLogout = e => {
    e.preventDefault();
    cookies.remove('token'); // remove cookie
    logOut(); // clear redux store
    if (router.pathname === '/admin') router.push('/');
  };

  return (
    <nav id="menu">
      <table id="dest" width="100%">
        <tbody>
          <tr>
            <td colSpan="2" className="dest__joint">
              {_get(names, router.pathname, '')}
            </td>
          </tr>
          <tr height="50px">
            <td className="dest__dotted" />
            <td />
          </tr>
        </tbody>
      </table>
      <div className="menu--container">
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
      </div>
    </nav>
  );
};

const mapStateToProps = state => {
  return { user: state.user };
};

export default connect(
  mapStateToProps,
  { logOut: logout },
)(withRouter(Menu));
