import express from  'express';
import cors from 'cors';
import { filesProxy, foldersProxy, synthesesProxy, authProxy } from './api/proxies/index.js';
import { Auth, NoPageFound, ErrorHandler } from './api/middlewares/index.js';

const app = express();

app.use(cors());

// serve client files
app.use('/', express.static('public'));

// Example of a protected route
app.get('/api', Auth, async (req, res) => {
  if (req.user.id) {
    res.status(200).json({ message: 'Authorized', user: req.user });
    return;
  }
  res.status(401).json({ message: 'Unauthorized' });
});

/**
 * Define proxy for files service
 */
app.post('/api/files', Auth, filesProxy.create);

app.get('/api/files', Auth, filesProxy.list);

app.get('/api/files/:id', Auth, filesProxy.read);

app.put('/api/files/:id', Auth, filesProxy.update);

app.delete('/api/files/:id', Auth, filesProxy.remove);

app.post('/api/files/:id/transcribe', Auth, filesProxy.transcribe);

app.post('/api/files/:id/synthesize', Auth, filesProxy.synthesize);

app.get('/api/media/:id/download', Auth, filesProxy.download);

app.get('/api/files/:id/transcript', Auth, filesProxy.readTranscript);

/**
 * Define proxy for folders service
 */
app.get('/api/folders', Auth, foldersProxy.list);

app.post('/api/folders', Auth, foldersProxy.create);

app.get('/api/folders/:id', Auth, foldersProxy.read);

app.delete('/api/folders/:id', Auth, foldersProxy.remove);

app.get('/api/folders/:id/files', Auth, foldersProxy.listFiles);

/**
 * Define proxy for syntheses service
 */
app.get('/api/syntheses', Auth, synthesesProxy.list);

app.get('/api/syntheses/public', Auth, synthesesProxy.listPublic);

app.get('/api/syntheses/:id', Auth, synthesesProxy.read);

app.put('/api/syntheses/:id', Auth, synthesesProxy.update);

/**
 * Define proxy search service
 */
app.get('/api/search', Auth, filesProxy.search);

app.post('/api/search-transcript', Auth, filesProxy.searchTranscript);

/**
 * Define proxy for auth service
 */
app.post('/api/login', authProxy.login);

app.post('/api/register', authProxy.register);

app.get('/api/refresh-token', authProxy.refresh);

// ----------------------------------------------------

app.use(NoPageFound);
app.use(ErrorHandler);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
