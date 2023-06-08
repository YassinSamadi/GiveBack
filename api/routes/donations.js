import express from 'express';
import {getAllDonations, getAllDonationsByUser, userDonation,getTotalDonations,getHighestDonation,getDonationsToOrganization,getTopDonatorToOrg,getTotalDonationsReceivedByOrg } from "../controllers/donation.js";

const router = express.Router();

router.get('/', getAllDonations);
router.post('/userdonation', userDonation);
router.get('/getalldonationsbyuser', getAllDonationsByUser);
router.get('/getTotalDonations', getTotalDonations);
router.get('/getHighestDonation', getHighestDonation);
router.get('/getDonationsToOrganization', getDonationsToOrganization);
router.get('/getTotalDonationsReceivedByOrg', getTotalDonationsReceivedByOrg);
router.get('/getTopDonatorToOrg', getTopDonatorToOrg);
export default router;
