const API_URL = "http://localhost:5000/api/users";

export const getProfile = async (token) => {
  const response = await fetch(`${API_URL}/profile`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return await response.json();
};

export const updateArtistProfile = async (token, data) => {
  const response = await fetch(`${API_URL}/artists/profile`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  });

  return await response.json();
};

export const getArtists = async () => {
  const response = await fetch(`${API_URL}/artists`);
  return await response.json();
};

export const getArtistById = async (id) => {
  const response = await fetch(`${API_URL}/artists/${id}`);
  return await response.json();
};