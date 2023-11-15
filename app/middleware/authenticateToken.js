import jwt from 'jsonwebtoken';
import Debug from 'debug';

const debug = Debug('pepine:authenticateToken');

/**
 * Middleware function to authenticate a JSON Web Token (JWT) in the requestuest header.
 * @param {Object} request - The request object.
 * @param {Object} response - The response object.
 * @param {Function} next - The next middleware function.
 * @returns {Object} - The response object or the next middleware function.
 */
export default function authenticateToken(request, response, next) {
  // Gather the jwt access token from the requestuest header
  const authHeader = request.headers.authorization;
  debug(authHeader);
  const token = authHeader && authHeader.split(' ')[1];

  // authorizes /api-docs route
  if (request.path.startsWith('/api-docs')) {
    return next();
  }
  // check if token exists
  if (!token) {
    return response.status(401).send({
      message: 'No token provided!',
    });
  }
  // verifies secret and checks exp
  return jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      return response.status(403).send({
        message: 'Unauthorized!',
      });
    }
    request.user = user;

    return next();
  });
}
