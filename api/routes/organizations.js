import express from 'express';
import { getAllOrganizations } from "../controllers/organization.js";

const router = express.Router();

router.get('/', getAllOrganizations);

export default router;
