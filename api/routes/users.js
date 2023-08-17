import express from 'express';
import { updateUser } from '../controllers/user.js';
import { getUser } from '../controllers/user.js';
const router = express.Router();

router.put('/updateUser',updateUser);
router.get('/getUser',getUser);

export default router;