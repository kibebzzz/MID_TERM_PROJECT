import express from "express";

import { 
    createOrder,
    getOrders,
    getOrder,
    payOrder,
    deleteOrder
 } from "../controllers/order.controller.js";

const router = express.Router();

router.post("/checkout", createOrder);
router.get("/user/:userId", getOrders);

router.get("/:orderId", getOrder);

router.patch("/:orderId/payment", payOrder);

router.delete(
  "/:orderId",
  deleteOrder
);

export default router;