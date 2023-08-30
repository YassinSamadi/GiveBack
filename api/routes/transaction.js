import express from 'express';
import { addTransaction, getActiveTransactions, confirmPickup, deleteTransaction } from '../controllers/transaction.js';
const router = express.Router();

router.post('/addtransaction', addTransaction);
router.get('/getactivetransactions', getActiveTransactions);
router.put('/confirmPickup', confirmPickup);
router.delete('/deleteTransaction', deleteTransaction);

export default router;