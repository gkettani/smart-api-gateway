import { createProxyMiddleware } from 'http-proxy-middleware';

const FILES_SERVICE_HOST = process.env.FILES_SERVICE_HOST || 'http://localhost';
const FILES_SERVICE_PORT = process.env.FILES_SERVICE_PORT || '3000';

const read = createProxyMiddleware({
  target: `http://${FILES_SERVICE_HOST}:${FILES_SERVICE_PORT}`,
  changeOrigin: true,
  pathRewrite: (_path, req) => {
    return `/syntheses/${req.params.id}`
  },
  onProxyReq: (proxyReq, req, _res) => {
    proxyReq.setHeader('x-user-id', req.user.id);
  }
});

const update = createProxyMiddleware({
  target: `http://${FILES_SERVICE_HOST}:${FILES_SERVICE_PORT}`,
  changeOrigin: true,
  pathRewrite: (_path, req) => {
    return `/syntheses/${req.params.id}`
  },
  onProxyReq: (proxyReq, req, _res) => {
    proxyReq.setHeader('x-user-id', req.user.id);
  }
});

const list = createProxyMiddleware({
  target: `http://${FILES_SERVICE_HOST}:${FILES_SERVICE_PORT}`,
  changeOrigin: true,
  pathRewrite: { '^/api/syntheses': '/syntheses' },
  onProxyReq: (proxyReq, req, _res) => {
    proxyReq.setHeader('x-user-id', req.user.id);
  }
});

const listPublic = createProxyMiddleware({
  target: `http://${FILES_SERVICE_HOST}:${FILES_SERVICE_PORT}`,
  changeOrigin: true,
  pathRewrite: { '^/api/syntheses/public': '/syntheses/public' },
});

export default {
  read,
  list,
  listPublic,
  update
};
