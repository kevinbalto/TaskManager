import express from "express";
import {registerUser, autenticate, confirm, forgotPassword, checkToken, 
        newPassword, profile} from "../controllers/userController.js";
import checkAuth from "../middleware/checkAuth.js";

const router = express.Router();

router.post("/", registerUser);
router.post("/login", autenticate);
router.get("/confirm/:token", confirm);
router.post("/forgot-password", forgotPassword);
router.get('/profile', checkAuth, profile);
router
      .route("/forgot-password/:token")
      .get(checkToken)
      .post(newPassword);
  
export default router;   