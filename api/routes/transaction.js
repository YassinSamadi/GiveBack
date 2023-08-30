import express from 'express';
import { addTransaction, getActiveTransactions, confirmPickup } from '../controllers/transaction.js';
const router = express.Router();

router.post('/addtransaction', addTransaction);
router.get('/getactivetransactions', getActiveTransactions);
router.post('/confirmPickup', confirmPickup)

export default router;