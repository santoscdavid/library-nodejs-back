import 'reflect-metadata';
import express, { NextFunction, Request, Response } from 'express';
import 'express-async-errors';
import cors from 'cors';
import { errors } from 'celebrate';
import router from './routes/index';
import AppError from '@api/middlewares/AppError';
import '@api/configuration/DependencyInjectionConfig';

const app = express();

app.use(cors());
app.use(express.json());

app.use(router);
app.use(errors());

app.use((error: Error, req: Request, res: Response, next: NextFunction) => {
    if (error instanceof AppError) {
        return res.status(error.statusCode).json({
            status: 'error',
            message: error.message,
        });
    }

    console.log(error);

    return res.status(500).json({
        status: 'error',
        message: 'internal server error',
    });
});

export { app };
