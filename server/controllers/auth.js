import jwt from 'jsonwebtoken';
import Admin from '../../models/Admin';

/**
 * POST login middleware
 * receives body /w email and password
 * send json /w token and user info to user response
 * @param {Request} [req]
 * @param {Response} [res]
 * @param {function} [next]
 */
export const login = async (req, res, next) => {
  console.log(req.body);
  const { email, password } = req.body;
  const adminInfo = await Admin.login(email, password);
  if (adminInfo) {
    const token = jwt.sign(
      { email: adminInfo.email, username: adminInfo.username },
      process.env.JWT_SECRET,
      { expiresIn: 60 },
    ); // 1 min token
    res
      .status(200)
      .json({ email: adminInfo.email, username: adminInfo.username, token });
  } else {
    res.status(401).json('wrong password');
  }
};

/**
 * GET this module does nothing except sending out a message that says 'token is proper'
 * token must be validated via other auth Middleware.
 * sends token info via json
 * @param {Request} [req]
 * @param {Response} [res]
 * @param {function} [next]
 */
export const tokenValidated = app => (req, res, next) => {
  return res
    .status(200)
    .json({ message: 'token is validated', data: req.jwtPayload });
};
