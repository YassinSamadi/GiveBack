import express from 'express';
import { getAllOrganizations, getOrganizationNeedsById } from "../controllers/organization.js";
const router = express.Router();

router.get('/', getAllOrganizations);
router.get('/:id/getOrganizationNeedsById', getOrganizationNeedsById);

export default router;
