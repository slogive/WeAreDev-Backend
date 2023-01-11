import Boom from '@hapi/boom';
import { Request, Response } from 'express';
import { users } from '../models/users';

export const getUsers = async (req: Request, res: Response) => {
  try {
    const getUsers: any = await users.findAll();

    res.json(getUsers);
  } catch (err) {
    return res.status(Boom.internal().output.payload.statusCode).json(Boom.internal().output.payload);
  }
};
