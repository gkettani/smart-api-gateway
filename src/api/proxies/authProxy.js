import { createProxyMiddleware } from 'http-proxy-middleware';

const AUTH_SERVICE_HOST = process.env.AUTH_SERVICE_HOST || 'http://localhost';
const AUTH_SERVICE_PORT = process.env.AUTH_SERVICE_PORT || '5000';


const login = createProxyMiddleware({
  target: `http://${AUTH_SERVICE_HOST}:${AUTH_SERVICE_PORT}`,
  changeOrigin: true,
  pathRewrite: { '^/api/login': '/login' },
});

const register = createProxyMiddleware({
  target: `http://${AUTH_SERVICE_HOST}:${AUTH_SERVICE_PORT}`,
  changeOrigin: true,
  pathRewrite: { '^/api/register': '/register' },
});

const refresh = createProxyMiddleware({
  target: `http://${AUTH_SERVICE_HOST}:${AUTH_SERVICE_PORT}`,
  changeOrigin: true,
  pathRewrite: { '^/api/refresh-token': '/refresh' },
});

export default {
  login,
  register,
  refresh
};
