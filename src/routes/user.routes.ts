import { Router } from 'express';
import { deleteUser, getUser, loginUser, postUser, putUser, testUser } from '../controllers/user.controller';

const router = Router();

router.post('/getUser', getUser);
router.post('/user', postUser);
router.post('/DeleteUser', deleteUser);
router.put('/user', putUser);
router.post('/testUser', testUser);
router.post('/login', loginUser);

export default router;
