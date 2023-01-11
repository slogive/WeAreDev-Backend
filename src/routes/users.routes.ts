import { Router } from 'express';
import { getUsers } from '../controllers/users.controller';

const router = Router();

router.post('/getUsers', getUsers);

export default router;
