import express from 'express';
import { registerAddress, getAllAddressesOrganizations,getAllAddressesWithOrganizations  } from "../controllers/address.js";

const router = express.Router();

router.post("/register", registerAddress);
router.post("/getOrganizations", getAllAddressesOrganizations);
router.get('/addresseswithorganizations', getAllAddressesWithOrganizations);

export default router;