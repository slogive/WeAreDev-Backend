import Boom from '@hapi/boom';
import { Request, Response } from 'express';
import { users } from '../models/users';
import bcrypt from 'bcrypt';

export const postUser = async (req: Request, res: Response) => {
  try {
    const { name, surname, score, status, document, documentType, password, rePassword, email } = req.body;

    const postUser: any = await users.create({
      name,
      surname,
      score,
      status,
      document,
      documentType,
      password,
      email,
    });

    res.json(postUser);
  } catch (err) {
    return res.json(Boom.internal().output.payload);
  }
};

export const getUser = async (req: Request, res: Response) => {
  try {
    const getUser = await users.findOne({
      where: {
        id: req.body.id,
      },
    });

    res.json(getUser);
  } catch (err) {
    return res.status(Boom.internal().output.payload.statusCode).json(Boom.internal().output.payload);
  }
};

export const deleteUser = async (req: Request, res: Response) => {
  try {
    const deleteUser = await users.destroy({
      where: {
        id: req.body.id,
      },
    });

    res.json({ statusCode: 204, message: 'User deleted' });
  } catch (err) {
    return res.status(Boom.internal().output.payload.statusCode).json(Boom.internal().output.payload);
  }
};

export const putUser = async (req: Request, res: Response) => {
  try {
    const putUser: any = await users.findByPk(req.body.id);
    putUser.name = req.body.name;
    putUser.surname = req.body.surname;
    putUser.score = req.body.score;
    putUser.status = req.body.status;
    putUser.document = req.body.document;
    putUser.documentType = req.body.documentType;
    putUser.password = req.body.password;
    putUser.rePassword = req.body.rePassword;
    putUser.email = req.body.email;

    await putUser?.save();

    res.json({ statusCode: 204, message: 'User updated', body: putUser });
  } catch (err) {
    return res.status(Boom.internal().output.payload.statusCode).json(Boom.internal().output.payload);
  }
};

export const testUser = async (req: Request, res: Response) => {
  try {
    const password = req.body.password;

    const hash = await bcrypt.hash(password, 10);

    bcrypt.compare(password, hash, (err, result) => {
      if (result) {
        res.json({ password: 'ok' });
      } else {
        res.json({ password: 'fail' });
      }
    });

    // res.json({ hash });
  } catch (err) {
    return res.status(Boom.internal().output.payload.statusCode).json(Boom.internal().output.payload);
  }
};
