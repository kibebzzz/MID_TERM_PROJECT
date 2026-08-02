import { createContext, useContext, useEffect, useMemo, useState } from "react";
import toast from "react-hot-toast";

import { useAuth } from "./AuthContext";

import {
  addToCart as addItemToCart,
  getCart,
  updateCartQuantity,
  removeCartItem,
  clearCart,
} from "../services/cartService";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const { user, isAuthenticated } = useAuth();

  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(true);

  const refreshCart = async () => {
    if (!user) {
      setCart([]);
      return;
    }

    const response = await getCart(user.id);

    if (response.success) {
      setCart(response.data.items || []);
    }
  };

  useEffect(() => {
    const load = async () => {
      setLoading(true);

      if (isAuthenticated && user) {
        await refreshCart();
      } else {
        setCart([]);
      }

      setLoading(false);
    };

    load();
  }, [user, isAuthenticated]);

  const addToCart = async (product) => {
    if (!user) {
      toast.error("Please login first.");
      return;
    }

    const response = await addItemToCart({
      userId: user.id,
      productId: product.id,
      quantity: 1,
    });

    if (response.success) {
      toast.success("Added to cart");
      await refreshCart();
    } else {
      toast.error(response.message);
    }
  };

  const removeFromCart = async (cartItemId) => {
    const response = await removeCartItem(cartItemId);

    if (response.success) {
      await refreshCart();
    }
  };

  const increaseQuantity = async (item) => {
    await updateCartQuantity(
      item.id,
      item.quantity + 1
    );

    await refreshCart();
  };

  const decreaseQuantity = async (item) => {
    if (item.quantity === 1) {
      await removeFromCart(item.id);
      return;
    }

    await updateCartQuantity(
      item.id,
      item.quantity - 1
    );

    await refreshCart();
  };

  const emptyCart = async () => {
    if (!user) return;

    const response = await clearCart(user.id);

    if (response.success) {
      setCart([]);
      toast.success("Cart cleared");
    }
  };

  const itemCount = useMemo(() => {
    return cart.reduce(
      (sum, item) => sum + item.quantity,
      0
    );
  }, [cart]);

  const total = useMemo(() => {
    return cart.reduce(
      (sum, item) =>
        sum +
        item.quantity *
          Number(item.product.price),
      0
    );
  }, [cart]);

  return (
    <CartContext.Provider
      value={{
        cart,
        loading,
        total,
        itemCount,
        addToCart,
        removeFromCart,
        increaseQuantity,
        decreaseQuantity,
        emptyCart,
        refreshCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);