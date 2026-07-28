import API from "./api";

export const getArtistStats = async (artistId) => {
  try {
    const response = await fetch(
      `${API}/products/artist/${artistId}/stats`
    );

    return await response.json();
  } catch (error) {
    console.error(error);

    return {
      success: false,
      message: "Unable to fetch dashboard statistics.",
    };
  }
};