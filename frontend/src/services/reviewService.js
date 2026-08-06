import API from "./api";

export const createReview = async (data) => {

  try {

    const response = await fetch(`${API}/reviews`, {

      method: "POST",

      headers: {
        "Content-Type": "application/json",
      },

      body: JSON.stringify(data),

    });

    return await response.json();

  } catch (error) {

    console.error(error);

    return {
      success: false,
      message: "Unable to submit review.",
    };

  }

};

export const getProductReviews = async (productId) => {

  try {

    const response = await fetch(
      `${API}/reviews/product/${productId}`
    );

    return await response.json();

  } catch (error) {

    console.error(error);

    return {
      success: false,
      message: "Unable to load reviews.",
    };

  }

};

export const updateReview = async (
  reviewId,
  data
) => {

  const response = await fetch(

    `${API}/reviews/${reviewId}`,

    {

      method: "PATCH",

      headers: {

        "Content-Type": "application/json",

      },

      body: JSON.stringify(data),

    }

  );

  return await response.json();

};

export const deleteReview = async (
  reviewId,
  buyerId
) => {

  const response = await fetch(

    `${API}/reviews/${reviewId}`,

    {

      method: "DELETE",

      headers: {

        "Content-Type": "application/json",

      },

      body: JSON.stringify({

        buyerId,

      }),

    }

  );

  return await response.json();

};