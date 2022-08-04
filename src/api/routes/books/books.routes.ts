import { Router } from 'express';
import { celebrate, Joi, Segments } from 'celebrate';
import BooksController from '@api/controllers/books/BooksController';

const booksRouter = Router();
const bookController = new BooksController();

booksRouter.get('/', bookController.index);

booksRouter.get(
    '/:id',
    celebrate({
        [Segments.PARAMS]: {
            id: Joi.string().uuid().required(),
        },
    }),
    bookController.show,
);
booksRouter.post(
    '/',
    celebrate({
        [Segments.BODY]: {
            name: Joi.string().required(),
            author: Joi.string().required(),
            publisher_id: Joi.string().uuid().required(),
            releaseDate: Joi.date().required(),
            price: Joi.number().required(),
            quantity: Joi.number().required(),
        },
    }),
    bookController.create,
);

booksRouter.put(
    '/:id',
    celebrate({
        [Segments.BODY]: {
            name: Joi.string().required(),
            author: Joi.string().required(),
            publisher_id: Joi.string().uuid().required(),
            releaseDate: Joi.date().required(),
            price: Joi.number().required(),
            quantity: Joi.number().required(),
        },
        [Segments.PARAMS]: {
            id: Joi.string().uuid().required(),
        },
    }),
    bookController.update,
);

booksRouter.delete(
    '/:id',
    celebrate({
        [Segments.PARAMS]: {
            id: Joi.string().uuid().required(),
        },
    }),
    bookController.delete,
);

export default booksRouter;
