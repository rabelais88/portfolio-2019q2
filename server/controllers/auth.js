const jwt = require('jsonwebtoken');
import Admin from '../../models/Admin';

const login = secret => async (req, res, next) => {

  console.log(req.body);
  const { email, password } = req.body;
  const adminInfo = await Admin.login(email, password);
  if (!!adminInfo) {
    const token = jwt.sign({ email: adminInfo.email, username: adminInfo.username }, secret, { expiresIn: 60 }) // 1 min token
    res.status(200).json({ email: adminInfo.email, username: adminInfo.username, token });
  } else {
    const err = new Error('wrong password');
    err.statusCode = 401;
    console.log(err);
    res.status(401).json(err);
  }

}

const auth = app => (req, res, next) => {
  console.log('token check inside auth controller');
  return res.status(200).json({ message: 'token is validated', data: req.jwtPayload });
}

module.exports = {
  login,
  auth,
}