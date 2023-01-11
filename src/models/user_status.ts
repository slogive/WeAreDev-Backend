import { DataTypes } from 'sequelize';
import { sequelize } from '../database/db';

export const user_status = sequelize.define('user_status', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  label: { type: DataTypes.STRING },
  value: { type: DataTypes.STRING },
});

// id // int [pk, increment]
// label // varchar(255)
// value // varchar(255)
