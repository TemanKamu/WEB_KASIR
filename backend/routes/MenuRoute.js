import express from "express";
import {
  getAllMenu,
  getMenuByCategory,
  getMenuById,
  getMenuBySearch,
  createMenu,
  updateMenu,
  deleteMenu,
} from "../controllers/MenuController.js";

const router = express.Router();

router.get("/menu", getAllMenu);
router.get("/menu/category/:id", getMenuByCategory);
router.get("/menu/search/:menu", getMenuBySearch);
router.get("/menu/:id", getMenuById);
router.post("/menu", createMenu);
router.patch("/menu/:id", updateMenu);
router.delete("/menu/:id", deleteMenu);

export default router;
