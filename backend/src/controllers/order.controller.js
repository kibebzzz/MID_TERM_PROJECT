import {
  createOrder as createOrderService,
  completePayment,
  getOrderById,
  getUserOrders,
  deletePendingOrder,
} from "../services/order.service.js";

export const createOrder = async (req, res) => {
  try {
    const order = await createOrderService(req.body.userId);

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

export const getOrder = async (req, res) => {

  try {

    const order = await getOrderById(
      req.params.orderId
    );

    res.status(200).json({
      success: true,
      data: order,
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }

};

export const payOrder = async (req, res) => {

  try {

    const order = await completePayment(
      req.params.orderId,
      req.body
    );

    res.status(200).json({
      success: true,
      message: "Payment completed.",
      data: order,
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }

};

export const deleteOrder = async (
  req,
  res
) => {

  try {

    await deletePendingOrder(

      req.params.orderId,

      req.body.userId

    );

    res.json({

      success: true,

      message:
        "Order deleted successfully.",

    });

  } catch (error) {

    res.status(400).json({

      success: false,

      message: error.message,

    });

  }

};