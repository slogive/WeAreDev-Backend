import { DataTypes } from 'sequelize';
import { sequelize } from '../database/db';
import { user_status } from './user_status';
import { user_document_type } from './user_document_type';

export const users = sequelize.define('users', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  name: { type: DataTypes.STRING },
  surname: { type: DataTypes.STRING },
  score: { type: DataTypes.STRING },
  status: { type: DataTypes.STRING },
  document: { type: DataTypes.STRING },
  documentType: { type: DataTypes.STRING },
  password: { type: DataTypes.STRING },
  email: { type: DataTypes.STRING },
});

user_status.belongsTo(users, { targetKey: 'id' });
users.hasOne(user_status, {
  foreignKey: 'id',
  sourceKey: 'id',
});

user_document_type.belongsTo(users, { targetKey: 'id' });
users.hasOne(user_document_type, {
  foreignKey: 'id',
  sourceKey: 'id',
});

// id // int [pk, increment]
// name // varchar(255)
// surname // varchar(255)
// score // int
// status // int [ref: > user_status.id]
// document // int
// document_type // int [ref: > user_document_type.id]
// password // varchar(255) [not null]
// email // varchar(255)
