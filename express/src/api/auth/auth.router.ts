import { Router } from 'express';

import {
  loginUser,
  signupUser,
  recoveryUser,
  verifyUser,
  validateUser,
} from './auth.controller';

const router: Router = Router();

router.post('/login', loginUser);
router.post('/signup', signupUser);
router.post('/recovery', recoveryUser);
router.post('/verify/:token', verifyUser);
router.post('/validate', validateUser);

//activation
//resend
//confirm

export { router as authRouter };
