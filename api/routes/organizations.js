import express from 'express';
import { getAllOrganizations } from "../controllers/organization.js";
import { getOrganizationNeedsById } from '../controllers/organization.js';
const router = express.Router();

router.get('/', getAllOrganizations);
router.get('/:id/getOrganizationNeedsById', getOrganizationNeedsById);

export default router;
