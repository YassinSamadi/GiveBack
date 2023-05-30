import express from 'express';
import { getAllDonationsByUser } from "../controllers/donation.js";

const router = express.Router();

router.get('/', getAllDonationsByUser);

export default router;
