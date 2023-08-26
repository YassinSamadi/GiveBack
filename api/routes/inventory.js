import express from 'express';
import { getInventory, getInventories, addProduct, addToInventory, removeFromInventory } from "../controllers/inventory.js";

const router = express.Router();

router.get('/getinventory', getInventory);
router.get('/getinventories', getInventories);
router.post('/addproduct', addProduct);
router.put('/addtoinventory', addToInventory);
router.put('/removefrominventory', removeFromInventory);

export default router;