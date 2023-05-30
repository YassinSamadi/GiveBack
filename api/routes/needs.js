import express from 'express';
import { deleteNeed, getAllNeeds, addNeed,getNeed, updateNeed } from "../controllers/need.js";

const router = express.Router();

router.get('/', getAllNeeds);
router.get('/:id', getNeed);
router.post('/', addNeed );
router.delete('/:id', deleteNeed);
router.put('/:id',updateNeed);



export default router;
