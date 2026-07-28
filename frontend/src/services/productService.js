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

export const getArtistProducts = async (artistId) => {
  try {
    const response = await fetch(
      `${API_URL}/artist/${artistId}`
    );

    return await response.json();
  } catch (error) {
    console.error(error);

    return {
      success: false,
      message: "Unable to fetch artist products.",
    };
  }
};


export const deleteProduct = async (id) => {
  try {
    const response = await fetch(`${API_URL}/${id}`, {
      method: "DELETE",
    });

    return await response.json();
  } catch (error) {
    console.error(error);

    return {
      success: false,
      message: "Unable to delete product.",
    };
  }
};

export const createProduct = async (product) => {
  try {
    const response = await fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(product),
    });

    return await response.json();
  } catch (error) {
    console.error(error);

    return {
      success: false,
      message: "Unable to create product.",
    };
  }
};