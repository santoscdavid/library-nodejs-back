import { Router } from 'express';
import PublishersController from '@api/controllers/publishers/PublishersController';
import { celebrate, Joi, Segments } from 'celebrate';

const publishersRouter = Router();
const publishersController = new PublishersController();

publishersRouter.get('/', publishersController.index);

publishersRouter.get(
    '/:id',
    celebrate({
        [Segments.PARAMS]: {
            id: Joi.string().uuid().required(),
        },
    }),
    publishersController.show,
);
publishersRouter.post(
    '/',
    celebrate({
        [Segments.BODY]: {
            name: Joi.string().required(),
            city: Joi.string().required(),
        },
    }),
    publishersController.create,
);

publishersRouter.put(
    '/:id',
    celebrate({
        [Segments.BODY]: {
            name: Joi.string().required(),
            city: Joi.string().required(),
        },
        [Segments.PARAMS]: {
            id: Joi.string().uuid().required(),
        },
    }),
    publishersController.update,
);

publishersRouter.delete(
    '/:id',
    celebrate({
        [Segments.PARAMS]: {
            id: Joi.string().uuid().required(),
        },
    }),
    publishersController.delete,
);

export default publishersRouter;
