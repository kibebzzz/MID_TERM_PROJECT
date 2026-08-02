import express from "express";

import {
  addItem,
  getUserCart,
  removeItem,
  updateQuantity,
  clearUserCart,
} from "../controllers/cart.controller.js";

const router = express.Router();

router.post("/", addItem);

router.get("/:userId", getUserCart);

router.delete("/:id", removeItem);

router.patch("/:id", updateQuantity);

router.delete("/user/:userId", clearUserCart);

export default router;