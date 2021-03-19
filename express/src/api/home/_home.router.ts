import { Router } from 'express';

import { home } from './_home.controller';

const router: Router = Router();

router.get('/', home);

export { router as homeRouter };
