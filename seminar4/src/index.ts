import express, { Request, Response, NextFunction } from 'express';
import dotenv from 'dotenv';
import connectDB from './loaders/db';
import routes from './routes';

const app = express();

dotenv.config();

void connectDB();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(routes);

interface ErrorType {
  message: string;
  status: number;
}

app.use(function (err: ErrorType, req: Request, res: Response, next: NextFunction) {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'production' ? err : {};

  res.status(err.status || 500);
  res.render('error');
});

app
  .listen(process.env.PORT, () => {
    console.log(`
    ################################################
          🛡️  Server listening on port 🛡️
    ################################################
  `);
  })
  .on('error', err => {
    console.error(err);
    process.exit(1);
  });
