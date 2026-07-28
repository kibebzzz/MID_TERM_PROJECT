import API from "./api";

export const uploadImage = async (file) => {
  try {
    const formData = new FormData();

    formData.append("image", file);

    const response = await fetch(`${API}/uploads`, {
      method: "POST",
      body: formData,
    });

    return await response.json();
  } catch (error) {
    console.error(error);

    return {
      success: false,
      message: "Unable to upload image.",
    };
  }
};