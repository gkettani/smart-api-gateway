import express from  'express';
import { createProxyMiddleware } from 'http-proxy-middleware';
import { Auth, NoPageFound, ErrorHandler } from './api/middlewares/index.js';

const AUTH_SERVICE_HOST = process.env.AUTH_SERVICE_HOST || 'http://localhost';
const AUTH_SERVICE_PORT = process.env.AUTH_SERVICE_PORT || '3000';

const FILES_SERVICE_HOST = process.env.FILES_SERVICE_HOST || 'http://localhost';
const FILES_SERVICE_PORT = process.env.FILES_SERVICE_PORT || '3000';

const app = express();

// serve client files
app.use('/', express.static('public'));

// Example of a protected route
app.get('/api', Auth, async (req, res) => {
  if (req.user.id) {
    res.send(`Hello World !! from api-gateway ${req.user.username}`);
    return;
  }
  res.status(401).json({ message: 'Unauthorized' });
});

/**
 * Define proxy for file service
 * - /api/files/upload -> /upload
 * - /api/files -> /files
 * - /api/files/:id -> /files/:id
 * - /api/files/:id/download -> /files/:id/download
 * - /api/files/:id/delete -> /files/:id/delete
 */
const uploadProxy = createProxyMiddleware({
  target: `http://${FILES_SERVICE_HOST}:${FILES_SERVICE_PORT}`,
  changeOrigin: true,
  pathRewrite: { '^/api/files/upload': '/upload' },
});
app.post('/api/files/upload', uploadProxy);

const downloadProxy = createProxyMiddleware({
  target: `http://${FILES_SERVICE_HOST}:${FILES_SERVICE_PORT}`,
  changeOrigin: true,
  pathRewrite: (_path, req) => {
    return `/download/${req.params.id}`
  }
});
app.get('/api/files/:id/download', downloadProxy);

/**
 * Define proxy for auth service
 * - /api/login -> /login
 * - /api/register -> /register
 * - /api/refresh-token -> /refresh
 */
const loginProxy = createProxyMiddleware({
  target: `http://${AUTH_SERVICE_HOST}:${AUTH_SERVICE_PORT}`,
  changeOrigin: true,
  pathRewrite: { '^/api/login': '/login' },
});
app.post('/api/login', loginProxy);

const registerProxy = createProxyMiddleware({
  target: `http://${AUTH_SERVICE_HOST}:${AUTH_SERVICE_PORT}`,
  changeOrigin: true,
  pathRewrite: { '^/api/register': '/register' },
});
app.post('/api/register', registerProxy);

const refreshTokenProxy = createProxyMiddleware({
  target: `http://${AUTH_SERVICE_HOST}:${AUTH_SERVICE_PORT}`,
  changeOrigin: true,
  pathRewrite: { '^/api/refresh-token': '/refresh' },
});
app.get('/api/refresh-token', refreshTokenProxy);

// ----------------------------------------------------

app.use(NoPageFound);
app.use(ErrorHandler);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
