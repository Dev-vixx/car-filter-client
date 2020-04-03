import path from 'path';
import express from 'express';
import helmet from 'helmet';

import htmlMiddleware from './middleware/html';
import storeMiddleware from './middleware/store'
import renderMiddleware from './middleware/render';

const publicPath = path.join(__dirname, '/public');
const app = express();

app.use(helmet())
app.use(express.static(publicPath));
app.use(htmlMiddleware());
app.use(storeMiddleware()); // must come before render middleware
app.use(renderMiddleware());

export default app;
