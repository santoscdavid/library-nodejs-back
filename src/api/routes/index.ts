import { Router } from 'express';

import publishersRouter from './publishers/publishers.routes';
import booksRouter from './books/books.routes';

const router = Router();

router.use('/publishers', publishersRouter);
router.use('/books', booksRouter);

export default router;
