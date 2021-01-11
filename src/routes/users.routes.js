import { Router } from 'express';
import User from '../models/User';

import * as userCtrl from '../controllers/user.controller';
import { authJwt, verifySignup } from '../middlewares';

const router = Router();

router.get('/', async( req, res ) => {
    const users = await User.find();
    res.json(users);
});

router.post('/', [authJwt.verifyToken, authJwt.isAdmin, verifySignup.checkRolesExisted, userCtrl.createUser])

export default router;