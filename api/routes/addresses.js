import express from 'express';
import { registerAddress, getAllAddressesOrganizations,getAllAddressesWithOrganizations,getAddressOrganization, updateAddress  } from "../controllers/address.js";

const router = express.Router();

router.post("/register", registerAddress);
router.post("/getOrganizations", getAllAddressesOrganizations);
router.get('/addresseswithorganizations', getAllAddressesWithOrganizations);
router.get('/getAddressOrganization/:id', getAddressOrganization);
router.put('/updateAddress', updateAddress);
export default router;