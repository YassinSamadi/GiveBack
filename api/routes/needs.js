import express from 'express';
import { deleteNeed, getAllNeeds, addNeed,getNeed, updateNeed,getUserNeeds,getSpecificNeed } from "../controllers/need.js";

const router = express.Router();


router.get('/getspecificneed', getSpecificNeed);
router.get('/getallneeds', getAllNeeds);
router.get('/:id', getNeed);
router.get('/getuserneeds', getUserNeeds);
router.post('/addneed', addNeed );
router.delete('/deleteNeed', deleteNeed);
router.put('/updateNeed',updateNeed);





export default router;
