import jwt from 'jsonwebtoken';

const config = process.env;

const verifyToken = (req, res, next) => {
  const token = req.query.token || req.body.token || req.headers.token || req.body.data.token;
  if (!token) {
    return res.status(403).send('A token is required for authentication');
  }
  try {
    const decoded = jwt.verify(token, config.TOKEN_KEY);
    // req.user = decoded;
    // return res.status(200).send({ token: 'secret' });
  } catch (err) {
    return res.status(401).send('Invalid Token');
  }
  next();
};

export default verifyToken;
