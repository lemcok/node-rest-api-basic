import { Router } from 'express';
import User from './users.model';

import * as userCtrl from './users.controller';
import { authJwt, verifySignup } from '../../middlewares';

const router = Router();

router.get('/', async( req, res ) => {
    const users = await User.find();
    res.json(users);
});

router.post('/', [authJwt.verifyToken, authJwt.isAdmin, verifySignup.checkRolesExisted, userCtrl.createUser])

export default router;