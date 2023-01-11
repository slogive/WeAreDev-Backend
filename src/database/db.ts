import { Sequelize } from 'sequelize';

export const sequelize = new Sequelize('CRUD', 'postgres', '3202648321', {
  host: 'localhost',
  dialect: 'postgres',
});
