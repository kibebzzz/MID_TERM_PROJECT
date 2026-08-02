import API from "./api";

export const checkout = async (userId) => {
  try {
    const response = await fetch(`${API}/orders/checkout`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userId,
      }),
    });

    return await response.json();

  } catch (error) {
    console.error(error);

    return {
      success: false,
      message: "Unable to complete checkout.",
    };
  }
};

export const getOrders = async (userId) => {
  try {
    const response = await fetch(`${API}/orders/${userId}`);

    return await response.json();

  } catch (error) {
    console.error(error);

    return {
      success: false,
      message: "Unable to load orders.",
    };
  }
};