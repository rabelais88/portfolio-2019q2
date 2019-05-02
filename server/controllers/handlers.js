const jwt = require('jsonwebtoken');

/**
 * Middleware to allow all sort of CORS request
 * only available for development environment
 * @param {Request} [req]
 * @param {Response} [res]
 * @param {function} [next]
 * @example
 * app.use(corsHandler)
 * */
export const allowCORS = (req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header(
    'Access-Control-Allow-Methods',
    'GET, POST, PATCH, PUT, DELETE, OPTIONS',
  );
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, Accept, Content-Type, Authorization',
  );
  if (req.method === 'OPTIONS') {
    // Stop the middleware chain
    return res.status(200).end();
  }
  next();
};

/**
 * Middleware to check given req.headers.token is proper
 * if token is not proper, next middleware is not reachable
 * @param {Request} [req]
 * @param {Response} [res]
 * @param {function} [next]
 * @example
 * app.get('/sercurepage', authHandler, pageController)
 * */
export const validateHeaderToken = (req, res, next) => {
  // console.log(req.headers);
  const token = req.headers.authorization;
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.jwtPayload = decoded;
    // console.log('decoded', decoded);
  } catch (e) {
    return res.status(401).json({ msg: e.message });
  }
  next();
};
