import express from 'express';
import { getAllOrganizations, getOrganizationNeedsById,getOrganization, getOrganizationsInventory, updateOrganization } from "../controllers/organization.js";
const router = express.Router();

router.get('/', getAllOrganizations);
router.get('/:id/getOrganizationNeedsById', getOrganizationNeedsById);
router.get('/getOrganization', getOrganization);
router.get('/getOrganizationsInventory', getOrganizationsInventory);
router.put('/updateOrganization', updateOrganization)

export default router;
