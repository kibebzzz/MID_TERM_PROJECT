import API from "./api";

export const getCart = async (userId) => {
  const response = await fetch(`${API}/cart/${userId}`);
  return await response.json();
};

export const addToCart = async (data) => {
  const response = await fetch(`${API}/cart`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  return await response.json();
};

export const updateCartQuantity = async (cartItemId, quantity) => {
  const response = await fetch(`${API}/cart/${cartItemId}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      quantity,
    }),
  });

  return await response.json();
};

export const removeCartItem = async (cartItemId) => {
  const response = await fetch(`${API}/cart/${cartItemId}`, {
    method: "DELETE",
  });

  return await response.json();
};

export const clearCart = async (userId) => {
  const response = await fetch(`${API}/cart/user/${userId}`, {
    method: "DELETE",
  });

  return await response.json();
};