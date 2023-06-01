import express from 'express';
import {register, login , logout} from "../controllers/authOrganization.js";

const router = express.Router();

router.post("/registerOrganization", register)
router.post("/loginOrganization", login)
router.post("/logoutOrganization", logout)

export default router;
