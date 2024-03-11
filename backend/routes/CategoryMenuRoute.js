import express from "express";
import {
  getAllCategoryMenu,
  getCategoryMenuById,
  createCategoryMenu,
  updateCategoryMenu,
  deleteCategoryMenu,
} from "../controllers/CategoryMenuController.js";

const router = express.Router();

router.get("/category-menu", getAllCategoryMenu);
router.get("/category-menu/:id", getCategoryMenuById);
router.post("/category-menu", createCategoryMenu);
router.patch("/category-menu/:id", updateCategoryMenu);
router.delete("/category-menu/:id", deleteCategoryMenu);

export default router;
