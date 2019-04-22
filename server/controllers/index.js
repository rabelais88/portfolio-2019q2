const jwt = require('jsonwebtoken');

const login = secret => (req, res, next) => {
  const token = jwt.sign({ "username": "Mike" }, secret, { expiresIn: 60 }) // 1 min token
  // return it back
  res.status(200).json({ token });
}

const auth = app => (req, res, next) => {
  console.log('token check inside auth controller');
  return res.status(200).json({ message: 'token is validated' });
}

module.exports = {
  login,
  auth,
}