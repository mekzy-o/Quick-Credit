import Authenticator from './authentication';

const { verifyToken } = Authenticator;

class Authorization {


  static verifyAdmin(req, res, next) {
    try {
      const token = req.headers.authorization.split(' ')[1];
      const decoded = verifyToken(token);

      req.user = decoded.payload;

      if (!req.user.isadmin) {
        return res.status(403).send({
          status: 403,
          error: 'Only Admin can access this route',
        });
      }
      return next();

    } catch (error) {
      return res.status(401).send({
        status: 401,
        error: 'Invalid or No Token Provided',
      });
    }
  }

  static verifyUser(req, res, next) {
    try {

      const token = req.headers.authorization.split(' ')[1];
      const decoded = verifyToken(token);
      req.user = decoded.payload;

      if (!req.user.id) {
        return res.status(403).send({
          status: 403,
          error: 'Only Authenticated User can access this route',
        });
      }
      return next();

    } catch (error) {
      return res.status(401).send({
        status: 401,
        error: 'Invalid or No token provided',
      });
    }
  }
}

export default Authorization;

