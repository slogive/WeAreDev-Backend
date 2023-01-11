process.env.TZ = process.env.NODE_ENV == 'development' ? 'est' : '';

import express from 'express';
import { sequelize } from './src/database/db';
import './src/models/users';
import './src/models/user_document_type';
import './src/models/user_status';
import usersRoutes from './src/routes/users.routes';
import userRoutes from './src/routes/user.routes';

const app = express();
app.use(express.json());

app.use(usersRoutes);
app.use(userRoutes);

async function Main() {
  console.time('Server started');
  try {
    await sequelize.sync({ force: false });

    app.listen(3001);
  } catch (err) {
    console.log(err);
  }

  console.timeEnd('Server started');
}

Main();
