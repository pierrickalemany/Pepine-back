import Debug from 'debug';

const debug = Debug('pepine:chekAdminRole');

// check if user is admin
export default function checkAdminRole(request, response, next) {
  if (process.env.NODE_ENV === 'development') {
    debug(request.user);
  }

  if (!request.user || request.user.role !== 'admin') {
    return response.status(403).send({
      message: 'Insufficient privileges!',
    });
  }
  next();

  return null;
}
