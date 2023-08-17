import express from 'express';
import { getInventory, addToInventory, removeFromInventory } from "../controllers/inventory.js";

const router = express.Router();

router.get('/getinventory', getInventory);
router.put('/addtoinventory', addToInventory)
router.put('/removefrominventory', removeFromInventory)

export default router;