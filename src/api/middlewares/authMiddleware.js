import fetch from 'node-fetch';
import { UnauthorizedError } from '../../config/errors/index.js';

export default async function authMiddleware(req, _res, next) {
  const isAuth = await fetch(
    `http://${process.env.AUTH_SERVICE_HOST}:${process.env.AUTH_SERVICE_PORT}/validate`,
    {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        authorization: req.headers.authorization ?? '',
      },
    },
  );
  if (!isAuth.ok) {
    next(new UnauthorizedError('Unauthorized'));
    return;
  }
  const { id, username } = await isAuth.json();
  req.user = { id, username };
  next();
}
