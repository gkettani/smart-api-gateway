import { createProxyMiddleware } from 'http-proxy-middleware';

const FILES_SERVICE_HOST = process.env.FILES_SERVICE_HOST || 'http://localhost';
const FILES_SERVICE_PORT = process.env.FILES_SERVICE_PORT || '3000';

const create = createProxyMiddleware({
  target: `http://${FILES_SERVICE_HOST}:${FILES_SERVICE_PORT}`,
  changeOrigin: true,
  pathRewrite: { '^/api/folders': '/folders' },
  onProxyReq: (proxyReq, req, _res) => {
    proxyReq.setHeader('x-user-id', req.user.id);
  }
});

const read = createProxyMiddleware({
  target: `http://${FILES_SERVICE_HOST}:${FILES_SERVICE_PORT}`,
  changeOrigin: true,
  pathRewrite: (_path, req) => {
    return `/folders/${req.params.id}`
  },
  onProxyReq: (proxyReq, req, _res) => {
    proxyReq.setHeader('x-user-id', req.user.id);
  }
});

const list = createProxyMiddleware({
  target: `http://${FILES_SERVICE_HOST}:${FILES_SERVICE_PORT}`,
  changeOrigin: true,
  pathRewrite: { '^/api/folders': '/folders' },
  onProxyReq: (proxyReq, req, _res) => {
    proxyReq.setHeader('x-user-id', req.user.id);
  }
});

const remove = createProxyMiddleware({
  target: `http://${FILES_SERVICE_HOST}:${FILES_SERVICE_PORT}`,
  changeOrigin: true,
  pathRewrite: (_path, req) => {
    return `/folders/${req.params.id}`
  },
  onProxyReq: (proxyReq, req, _res) => {
    proxyReq.setHeader('x-user-id', req.user.id);
  }
});

const listFiles = createProxyMiddleware({
  target: `http://${FILES_SERVICE_HOST}:${FILES_SERVICE_PORT}`,
  changeOrigin: true,
  pathRewrite: (_path, req) => {
    return `/folders/${req.params.id}/files`
  },
  onProxyReq: (proxyReq, req, _res) => {
    proxyReq.setHeader('x-user-id', req.user.id);
  }
});

export default {
  create,
  read,
  list,
  remove,
  listFiles
};
