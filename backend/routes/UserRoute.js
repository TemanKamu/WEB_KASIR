import express from "express";
import {
  getAllUser,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
} from "../controllers/UsersController.js";

const router = express.Router();

router.get("/user", getAllUser);
router.get("/user/:uuid", getUserById);
router.post("/user", createUser);
router.patch("/user/:uuid", updateUser);
router.delete("/user/:uuid", deleteUser);

export default router;
