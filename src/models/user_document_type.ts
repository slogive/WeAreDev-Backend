import { DataTypes } from 'sequelize';
import { sequelize } from '../database/db';

export const user_document_type = sequelize.define('user_document_type', {
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
