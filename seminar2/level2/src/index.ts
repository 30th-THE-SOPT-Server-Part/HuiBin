import express from 'express';
import api from './api';

const app = express();

app.use(express.json());
app.use('/api', api);

app.listen('8000', () => {
  console.log(`
      #############################################
          🛡️ Server listening on port: 8000 🛡️
      #############################################
  `);
});
