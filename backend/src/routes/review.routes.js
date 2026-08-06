import express from "express";

import {
  create,
  getAll,
  update, 
  remove,
} from "../controllers/review.controller.js";

const router = express.Router();

router.post("/", create);

router.patch("/:reviewId", update);

router.delete("/:reviewId", remove);

router.get(
  "/product/:productId",
  getAll
);

export default router;