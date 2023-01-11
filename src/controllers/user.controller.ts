import Boom from '@hapi/boom';
import { Request, Response } from 'express';
import { users } from '../models/users';
import bcrypt from 'bcrypt';

export const postUser = async (req: Request, res: Response) => {
  try {
    const { name, surname, score, status, document, documentType, password, rePassword, email } = req.body;

    if (password !== rePassword)
      return res.status(Boom.badRequest().output.payload.statusCode).json(Boom.badRequest('Password not match').output.payload);

    const postUser: any = await users.create({
      name,
      surname,
      score: Math.floor(Math.random() * (900 - 0 + 1) + 0),
      status: 1,
      document,
      documentType: 1,
      password: await bcrypt.hash(password, 10),
      email,
    });

    res.status(200).json({ statusCode: 200, message: 'User created', body: { postUser } });
  } catch (err) {
    console.error(err);

    return res.status(Boom.internal().output.payload.statusCode).json(Boom.internal().output.payload);
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
    if (req.body.password !== req.body.rePassword)
      return res.status(Boom.badRequest().output.payload.statusCode).json(Boom.badRequest('Password not match').output.payload);

    const hashedPassword = await bcrypt.hash(req.body.password, 10);

    const putUser: any = await users.findByPk(req.body.id);

    await users.update(
      {
        name: req.body.name,
        surname: req.body.surname,
        score: await putUser.score,
        status: await putUser.status,
        document: req.body.document,
        documentType: req.body.documentType,
        password: hashedPassword,
        email: req.body.email,
      },
      {
        where: {
          id: putUser.id,
        },
      }
    );

    res.json({ statusCode: 204, message: 'User updated', body: putUser });
  } catch (err) {
    return res.status(Boom.internal().output.payload.statusCode).json(Boom.internal().output.payload);
  }
};

export const loginUser = async (req: Request, res: Response) => {
  try {
    const user: any = await users.findOne({ where: { email: req.body.email } });

    const password = req.body.password;

    bcrypt.compare(password, user.password, async (err, result) => {
      if (result) {
        res.status(200).json({ statusCode: 200, body: { ...user.dataValues, token: '' } });
      } else {
        res.status(400).json({ statusCode: 400, message: 'User password not valid' });
      }
    });
  } catch (err) {
    console.error(err);

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
  } catch (err) {
    return res.status(Boom.internal().output.payload.statusCode).json(Boom.internal().output.payload);
  }
};
