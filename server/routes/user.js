import express from "express";
import { signup, signin, googleLogin } from "../controller/user.js";

const router = express.Router();

router.post("/signup", signup);
router.post("/signin", signin);
router.post("/googleLogin", googleLogin);

export default router;
