import jwt from 'jsonwebtoken';
import _get from 'lodash/get';

/**
 * POST login controller
 * after Passport basic auth, returns appropriate jwt token
 * @param {Request} [req]
 * @param {Response} [res]
 * @param {function} [next]
 */
export const login = async (req, res, next) => {
  try {
    const { user } = req; // passed down by passport basic strategy
    const { email, username } = user;
    if (user) {
      const token = jwt.sign({ email, username }, process.env.JWT_SECRET, { expiresIn: 60 * 60 }) // 1 min
      res.status(200).json({ token }); // token has both email and username info
    }
  } catch(err) {
    next(err);
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
export const tokenValidated = (req, res, next) => {
  console.log('token validated');
  return res
    .status(200)
    .json(req.user);
};
