import { 
    checkout,
    getUserOrders,
 } from "../services/order.service.js";

export const createOrder = async (req, res) => {
  try {
    const order = await checkout(req.body.userId);

    res.status(201).json({
      success: true,
      message: "Order created successfully.",
      data: order,
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const getOrders = async (req, res) => {
  try {
    const orders = await getUserOrders(req.params.userId);

    res.status(200).json({
      success: true,
      data: orders,
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};