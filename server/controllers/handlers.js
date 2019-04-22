const jwt = require('jsonwebtoken');

const corsHandler = (req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET, POST, PATCH, PUT, DELETE, OPTIONS");
  res.header("Access-Control-Allow-Headers", "Origin, Accept, Content-Type, Authorization");
  if (req.method === "OPTIONS") {
    // Stop the middleware chain
    return res.status(200).end();
  }
  next();
}

const authHandler = secret => (req, res, next) => {
  console.log('token check inside auth handler');
  console.log(req.headers);
  const token = req.headers.authorization;
  try {
    const decoded = jwt.verify(token, secret);
    console.log('decoded', decoded);
  } catch (e) {
    return res.status(401).json({ 'msg': e.message });
  }
  next();
};

module.exports = {
  corsHandler,
  authHandler
}