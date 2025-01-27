const serverless = require('serverless-http');
const express = require('express');
const app = express();

// Your SSR logic here
app.use(express.static('./dist/stroyka/browser'));

exports.handler = serverless(app);
