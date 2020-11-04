import { Router } from 'express';

const router: Router = Router();

router.post('/auth/login', (_req, res) => {
  res.json('login');
});

export { router as authRouter }