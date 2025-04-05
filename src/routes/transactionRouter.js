import express from 'express';
import transactionController from '../controllers/transactionController.js';
const {createTransaction,deleteTransaction,getAllTransaction,getTransaction,updateTransaction,transactionDetails} = transactionController;

const transactionRouter = express.Router();
transactionRouter.post('/',createTransaction);
transactionRouter.get('/',getAllTransaction);
transactionRouter.put('/:id',updateTransaction);
transactionRouter.delete('/:id',deleteTransaction);
transactionRouter.get('/:id',getTransaction);
transactionRouter.get('/details/:id',transactionDetails)

export default transactionRouter;