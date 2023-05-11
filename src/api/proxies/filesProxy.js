import { createProxyMiddleware } from 'http-proxy-middleware';

const FILES_SERVICE_HOST = process.env.FILES_SERVICE_HOST || 'http://localhost';
const FILES_SERVICE_PORT = process.env.FILES_SERVICE_PORT || '3000';

const create = createProxyMiddleware({
  target: `http://${FILES_SERVICE_HOST}:${FILES_SERVICE_PORT}`,
  changeOrigin: true,
  pathRewrite: { '^/api/files': '/files' },
  onProxyReq: (proxyReq, req, _res) => {
    proxyReq.setHeader('x-user-id', req.user.id);
  }
});

const read = createProxyMiddleware({
  target: `http://${FILES_SERVICE_HOST}:${FILES_SERVICE_PORT}`,
  changeOrigin: true,
  pathRewrite: (_path, req) => {
    return `/files/${req.params.id}`
  },
  onProxyReq: (proxyReq, req, _res) => {
    proxyReq.setHeader('x-user-id', req.user.id);
  }
});

const readTranscript = createProxyMiddleware({
  target: `http://${FILES_SERVICE_HOST}:${FILES_SERVICE_PORT}`,
  changeOrigin: true,
  pathRewrite: (_path, req) => {
    return `/files/${req.params.id}/transcript`
  },
  onProxyReq: (proxyReq, req, _res) => {
    proxyReq.setHeader('x-user-id', req.user.id);
  }
});

const list = createProxyMiddleware({
  target: `http://${FILES_SERVICE_HOST}:${FILES_SERVICE_PORT}`,
  changeOrigin: true,
  pathRewrite: { '^/api/files': '/files' },
  onProxyReq: (proxyReq, req, _res) => {
    proxyReq.setHeader('x-user-id', req.user.id);
  }
});

const remove = createProxyMiddleware({
  target: `http://${FILES_SERVICE_HOST}:${FILES_SERVICE_PORT}`,
  changeOrigin: true,
  pathRewrite: (_path, req) => {
    return `/files/${req.params.id}`
  },
  onProxyReq: (proxyReq, req, _res) => {
    proxyReq.setHeader('x-user-id', req.user.id);
  }
});

const update = createProxyMiddleware({
  target: `http://${FILES_SERVICE_HOST}:${FILES_SERVICE_PORT}`,
  changeOrigin: true,
  pathRewrite: (_path, req) => {
    return `/files/${req.params.id}`
  },
  onProxyReq: (proxyReq, req, _res) => {
    proxyReq.setHeader('x-user-id', req.user.id);
  }
});

const synthesize = createProxyMiddleware({
  target: `http://${FILES_SERVICE_HOST}:${FILES_SERVICE_PORT}`,
  changeOrigin: true,
  pathRewrite: (_path, req) => {
    return `/files/${req.params.id}/synthesize`
  },
  onProxyReq: (proxyReq, req, _res) => {
    proxyReq.setHeader('x-user-id', req.user.id);
  }
});

const transcribe = createProxyMiddleware({
  target: `http://${FILES_SERVICE_HOST}:${FILES_SERVICE_PORT}`,
  changeOrigin: true,
  pathRewrite: (_path, req) => {
    return `/files/${req.params.id}/transcribe`
  },
  onProxyReq: (proxyReq, req, _res) => {
    proxyReq.setHeader('x-user-id', req.user.id);
  }
});

const download = createProxyMiddleware({
  target: `http://${FILES_SERVICE_HOST}:${FILES_SERVICE_PORT}`,
  changeOrigin: true,
  pathRewrite: (_path, req) => {
    return `/download/${req.params.id}`
  },
  onProxyReq: (proxyReq, req, _res) => {
    proxyReq.setHeader('x-user-id', req.user.id);
  }
});

const search = createProxyMiddleware({
  target: `http://${FILES_SERVICE_HOST}:${FILES_SERVICE_PORT}`,
  changeOrigin: true,
  pathRewrite: { '^/api/search': '/search' },
  onProxyReq: (proxyReq, req, _res) => {
    proxyReq.setHeader('x-user-id', req.user.id);
  }
});

const searchTranscript = createProxyMiddleware({
  target: `http://${FILES_SERVICE_HOST}:${FILES_SERVICE_PORT}`,
  changeOrigin: true,
  pathRewrite: { '^/api/search-transcript': '/searchTranscript' },
  onProxyReq: (proxyReq, req, _res) => {
    proxyReq.setHeader('x-user-id', req.user.id);
  }
});

export default {
  create,
  read,
  list,
  remove,
  update,
  synthesize,
  transcribe,
  download,
  readTranscript,
  search,
  searchTranscript
};
