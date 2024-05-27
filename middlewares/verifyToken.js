import jwt from 'jsonwebtoken';
export const verifyToken = (req, res, next) => {
   // Check if the Authorization header is present
  const authHeader = req.headers['authorization'];
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'Unauthorized, Please login' });
  }

  // Extract the token from the Authorization header
  const token = authHeader.split(' ')[1];

  //verify token
  jwt.verify(token, process.env.JWT_SECRET_KEY, (err, decoded) => {
    if (err) {
      return res.status(403).json({ message: 'Forbidden' });
    }
    req.user = decoded;
    next();
  });
}