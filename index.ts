process.env.TZ = process.env.NODE_ENV == 'development' ? 'est' : '';

import express from 'express';
import { sequelize } from './src/database/db';
import './src/models/users';
import './src/models/user_document_type';
import './src/models/user_status';
import usersRoutes from './src/routes/users.routes';
import userRoutes from './src/routes/user.routes';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import Moment from 'moment';
import { errorHandler, errorLog, errorNotFound } from './src/middlewares/handlers';

const app = express();

// Starting middleware

app.use(express.json());

app.use(helmet());

app.use(
  cors({
    origin: '*',
    optionsSuccessStatus: 200,
  })
);

function toReadableRequest(method: any) {
  const reqMethod = method;
  const reqMethodLength = 6;

  return reqMethod
    .concat(' '.repeat(reqMethod.length > reqMethodLength ? 0 : reqMethodLength - reqMethod.length))
    .slice(0, reqMethodLength);
}

app.use(
  morgan((tokens, req, res) => {
    return `[${Moment().format('MMMM DD YYYY hh:mm:ss A [UTC]')}] | ${tokens.status(req, res)} | ${toReadableRequest(
      tokens.method(req, res)
    )} | ${tokens.url(req, res)} | ${tokens['response-time'](req, res)} ms`;
  })
);

// Routes

app.use(usersRoutes);
app.use(userRoutes);

// Running middleware

app.use(errorNotFound);

app.use(errorLog);

app.use(errorHandler);

async function Main() {
  console.time('Server started');
  try {
    await sequelize.sync({ force: false });

    app.listen(3001);
  } catch (err) {
    console.error(err);
  }

  console.timeEnd('Server started');
}

Main();
