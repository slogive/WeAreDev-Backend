import { Router } from 'express';
import { deleteUser, getUser, postUser, putUser, testUser } from '../controllers/user.controller';

const router = Router();

router.post('/getUser', getUser);
router.post('/user', postUser);
router.delete('/user', deleteUser);
router.put('/user', putUser);
router.post('/testUser', testUser);

export default router;
