import 'zone.js/node';
import { ngExpressEngine } from '@nguniversal/express-engine';
import { AppServerModule } from '../src/main.server';
import { join } from 'path';
import * as express from 'express';

const app = express();

// Static fayllar (Angular build natijalari)
app.use(express.static(join(process.cwd(), 'dist/stroyka/browser')));

// SSR uchun barcha marshrutlar
app.get('*', (req, res) => {
  res.render(join(process.cwd(), 'dist/stroyka/browser/index.html'), { req });
});

// Netlify Functions uchun eksport qilish
export const handler = app;
