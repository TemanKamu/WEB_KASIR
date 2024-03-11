import express from "express";
import {
  getAllBillDetails,
  getBillDetailsById,
  createBillDetail,
  deleteBillDetail,
} from "../controllers/BillDetailsController.js";

const router = express.Router();

router.get("/bill-details", getAllBillDetails);
router.get("/bill-details/:uuid", getBillDetailsById);
router.post("/bill-details", createBillDetail);
router.delete("/bill-details/:uuid", deleteBillDetail);

export default router;
