import { countDetail } from "../controllers/CountTotal.js";
import express from "express";

const router = express.Router();

router.post("/count", countDetail);

export default router;