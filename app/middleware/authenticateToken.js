import jwt from 'jsonwebtoken';

/**
 * Middleware function to authenticate a JSON Web Token (JWT) in the request header.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @param {Function} next - The next middleware function.
 * @returns {Object} - The response object or the next middleware function.
 */
export default function authenticateToken(req, res, next) {
  // Gather the jwt access token from the request header
  const authHeader = req.headers.authorization;

  const token = authHeader && authHeader.split(' ')[1];

  // authorizes /api-docs route
  if (req.path.startsWith('/api-docs')) {
    return next();
  }

  if (!token) {
    return res.status(401).send({
      message: 'No token provided!',
    });
  }

  return jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(403).send({
        message: 'Unauthorized!',
      });
    }
    req.user = user;
    return next();
  });
}
