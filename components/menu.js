import Go from './go';
import { withRouter } from 'next/router';
import _get from 'lodash/get';
import { connect } from 'react-redux';
import { logout } from '../actions/user';
import { Cookies } from 'react-cookie';
const cookies = new Cookies();

const names = {
  '/': 'HOME',
  '/gallery': 'WORKS',
  '/contact': 'CONTACT',
  '/login': 'ADMIN',
}
const Menu = ({ router, logOut, user }) => {

  const _logout = e => {
    e.preventDefault();
    cookies.remove('token'); // remove cookie
    logOut(); // clear redux store
    if (router.pathname === '/admin') router.push('/');
  }

  return (
    <nav id="menu">
      <table id="dest" width="100%">
        <tbody>
          <tr>
            <td colSpan="2" className="dest__joint">{ _get(names, router.pathname, '') }</td>
          </tr>
          <tr height="50px">
            <td className="dest__dotted"></td>
            <td></td>
          </tr>
        </tbody>
      </table>
      <div className="menu--container">
        <Go to="/"><img src="/static/home.svg" /></Go>
        <Go to="/gallery"><img src="/static/file-text.svg" /></Go>
        <Go to="/contact"><img src="/static/email.svg" /></Go>
        <Go to="/login"><img src="/static/cloud-upload.svg" /></Go>
        { user.auth ? 
          <a href="#" className="link" onClick={_logout}>
            <img src="/static/power-outline.svg" />
          </a> : null}
      </div>
    </nav>
  );
};

const mapStateToProps = state => {
  return ({ user: state.user })
}

export default connect(mapStateToProps, { logOut: logout })(withRouter(Menu));
