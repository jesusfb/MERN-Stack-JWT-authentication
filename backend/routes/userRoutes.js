import express from "express";
const router = express.Router();
import {
  userAuth,
  userLogout,
  userRegister,
  getUserProfile,
  updateUserProfile,
} from "../controllers/userController.js";
import { protect } from "../middleware/authMiddleware.js";

router.post("/", userRegister);
router.post("/auth", userAuth);
router.post("/logout", userLogout);
router
  .route("/profile")
  .get(protect, getUserProfile)
  .put(protect, updateUserProfile);

export default router;
