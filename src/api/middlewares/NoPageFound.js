import logger from '../../config/logger.js';

export default function NoPageFound(req, res) {
  logger.error(`The route [33m${req.url}[39m does not exist`);
  res.status(404).send('This page does not exist !');
}
