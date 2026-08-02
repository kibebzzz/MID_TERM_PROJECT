import {
  addToCart,
  getCart,
  removeCartItem,
  updateCartQuantity,
  clearCart,
} from "../services/cart.service.js";

export const addItem = async (req, res) => {
  try {
    const item = await addToCart(
      req.body.userId,
      req.body.productId,
      req.body.quantity
    );

    res.status(201).json({
      success: true,
      message: "Added to cart.",
      data: item,
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const getUserCart = async (req, res) => {
  try {
    const cart = await getCart(req.params.userId);

    res.status(200).json({
      success: true,
      data: cart,
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const removeItem = async (req, res) => {
  try {
    await removeCartItem(req.params.id);

    res.status(200).json({
      success: true,
      message: "Item removed.",
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const updateQuantity = async (req, res) => {
  try {
    const item = await updateCartQuantity(
      req.params.id,
      req.body.quantity
    );

    res.status(200).json({
      success: true,
      data: item,
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const clearUserCart = async (req, res) => {
  try {
    await clearCart(req.params.userId);

    res.status(200).json({
      success: true,
      message: "Cart cleared.",
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};