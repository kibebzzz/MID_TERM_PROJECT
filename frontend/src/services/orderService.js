import API from "./api";

export const completePayment = async (
  orderId,
  shipping
) => {

  try {

    const response = await fetch(
      `${API}/orders/${orderId}/payment`,
      {

        method: "PATCH",

        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify(shipping),

      }
    );

    return await response.json();

  } catch (error) {

    console.error(error);

    return {
      success: false,
      message: "Unable to complete payment.",
    };

  }

};

export const getOrder = async (orderId) => {

  try {

    const response = await fetch(
      `${API}/orders/${orderId}`
    );

    return await response.json();

  } catch (error) {

    console.error(error);

    return {
      success: false,
      message: "Unable to load order.",
    };

  }

};

export const getOrders = async (userId) => {
  try {
    const response = await fetch(`${API}/orders/user/${userId}`);

    return await response.json();

  } catch (error) {
    console.error(error);

    return {
      success: false,
      message: "Unable to load orders.",
    };
  }
};

export const createOrder = async (userId) => {

  try {

    const response = await fetch(
      `${API}/orders/checkout`,
      {

        method: "POST",

        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify({
          userId,
        }),

      }
    );

    return await response.json();

  } catch (error) {

    console.error(error);

    return {

      success: false,

      message: "Unable to create order.",

    };

  }

};

export const deleteOrder = async (
  orderId,
  userId
) => {

  const response = await fetch(

    `${API}/orders/${orderId}`,

    {

      method: "DELETE",

      headers: {
        "Content-Type": "application/json",
      },

      body: JSON.stringify({

        userId,

      }),

    }

  );

  return await response.json();

};