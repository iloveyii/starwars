import express from "express";
import { getConfirms } from "../controllers/confirms";

const router = express.Router();

router.route("/:id").get(getConfirms);
router.route("/").get(getConfirms);

export default router;
