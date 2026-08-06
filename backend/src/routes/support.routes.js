import express from "express";

import {

  create,

  getAll,

  updateStatus,

} from "../controllers/support.controller.js";

const router = express.Router();

router.post("/", create);

router.get("/", getAll);

router.patch("/:id", updateStatus);

export default router;