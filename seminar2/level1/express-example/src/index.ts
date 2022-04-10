import express, { Request, Response, NextFunction } from 'express';
import api from './api';

const app = express();

app.use(express.json());
app.use('/api', api);

app.get('/', (req: Request, res: Response, next: NextFunction) => {
  res.send('Hi! My name is Huibin!');
});

app.listen('8000', () => {
  console.log(`
      #############################################
          🛡️ Server listening on port: 8000 🛡️
      #############################################
  `);
});
