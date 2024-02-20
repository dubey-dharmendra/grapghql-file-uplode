import express from "express";
import userController from "../controller/userController.js";
const router = express.Router();

router.get("/get-all", userController.getAll);

export default router;
