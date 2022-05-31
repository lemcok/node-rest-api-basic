import { Router } from 'express';
import * as authCtrl from './auth.controller';
import { verifySignup } from '../../middlewares';

const router = Router();

router.post('/signup', [verifySignup.checkDuplicateEmail, verifySignup.checkRolesExisted] ,authCtrl.signUp)

router.post('/signin', authCtrl.signIn)


export default router;