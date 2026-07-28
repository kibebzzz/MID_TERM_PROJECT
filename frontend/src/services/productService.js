const API_URL = "http://localhost:5000/api/products";

export const getProducts = async () => {
  try {
    const response = await fetch(API_URL);

    return await response.json();
  } catch (error) {
    console.error(error);

    return {
      success: false,
      message: "Unable to fetch products.",
    };
  }
};