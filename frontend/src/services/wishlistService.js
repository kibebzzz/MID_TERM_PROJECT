import API from "./api";

export const getWishlist = async (userId) => {

  const response = await fetch(
    `${API}/wishlist/${userId}`
  );

  return await response.json();

};

export const addToWishlist = async (data) => {

  const response = await fetch(
    `${API}/wishlist`,
    {

      method: "POST",

      headers: {
        "Content-Type": "application/json",
      },

      body: JSON.stringify(data),

    }
  );

  return await response.json();

};

export const removeWishlistItem = async (
  wishlistItemId
) => {

  const response = await fetch(
    `${API}/wishlist/${wishlistItemId}`,
    {

      method: "DELETE",

    }
  );

  return await response.json();

};

export const clearWishlist = async (
  userId
) => {

  const response = await fetch(
    `${API}/wishlist/user/${userId}`,
    {

      method: "DELETE",

    }
  );

  return await response.json();

};