import express from "express";

import { 
    createOrder,
    getOrders,
 } from "../controllers/order.controller.js";

const router = express.Router();

router.post("/checkout", createOrder);
-
router.get("/:userId", getOrders);

export default router;