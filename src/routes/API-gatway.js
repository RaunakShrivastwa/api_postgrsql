import express from 'express';
import userRouter from './userRoutes.js';
import authRouter from './authRouter.js';
import venderRouter from './venderRouter.js';
import transactionRouter from './transactionRouter.js';

const APIrouter = express.Router();
APIrouter.use('/v1/users', userRouter);
APIrouter.use('/user', authRouter);
APIrouter.use('/v1/vender',venderRouter);
APIrouter.use('/v1/transaction',transactionRouter);


export default APIrouter;
