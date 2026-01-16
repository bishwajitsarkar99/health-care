import express from 'express';
import { register, getUser, updateUser, deleteUser, userLogin } from "../controllers/authController"

const router = express.Router();

router.get('/user/get', getUser);
router.post('/user/register', register);
router.put('/user/update', updateUser);
router.delete('/user/delete', deleteUser);
router.post('/user-login', userLogin);

export const authRouter = router;
