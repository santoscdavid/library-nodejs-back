import { Router } from 'express';
import publishersRouter from './publishers/publishers.routes';

const router = Router();

router.use('/publishers', publishersRouter);

export default router;
