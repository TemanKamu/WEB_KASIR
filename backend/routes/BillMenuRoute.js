import express from "express";
import {
  getAllBillMenu,
  createBillMenu,
  updateBillMenuCount,
  deleteBillMenu,
  deleteBillMenuAll
} from "../controllers/BillMenuController.js";

const router = express.Router();

router.get("/bill-menu/:uuid", getAllBillMenu);
router.post("/bill-menu", createBillMenu);
router.patch("/bill-menu/:id", updateBillMenuCount);
router.delete("/bill-menu/:id", deleteBillMenu);
router.delete("/bill-menu/all/:uuid", deleteBillMenuAll);

export default router;
