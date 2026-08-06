import express from "express";

import {

  getUserWishlist,
  addItem,
  removeItem,
  clear,

} from "../controllers/wishlist.controller.js";

const router = express.Router();

router.get("/:userId", getUserWishlist);

router.post("/", addItem);

router.delete("/:id", removeItem);

router.delete(
  "/user/:userId",
  clear
);

export default router;