import API from "./api";

export const getVerificationRequests = async (token) => {
  try {

    const response = await fetch(
      `${API}/users/verification-requests`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return await response.json();

  } catch (error) {

    console.error(error);

    return {
      success: false,
      message: "Unable to load verification requests.",
    };

  }
};

export const getArtistById = async (id, token) => {
  try {

    const response = await fetch(
      `${API}/users/artists/${id}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return await response.json();

  } catch {

    return {
      success: false,
      message: "Unable to load artist.",
    };

  }
};

export const reviewVerification = async (
  id,
  verificationStatus,
  verificationNotes,
  token
) => {

  try {

    const response = await fetch(
      `${API}/users/verification/${id}`,
      {
        method: "PUT",

        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },

        body: JSON.stringify({
          verificationStatus,
          verificationNotes,
        }),
      }
    );

    return await response.json();

  } catch {

    return {
      success: false,
      message: "Unable to update verification.",
    };

  }

};


export const getDashboardStats = async (token) => {
  try {

    const response = await fetch(
      `${API}/admin/dashboard`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return await response.json();

  } catch (error) {

    console.error(error);

    return {
      success: false,
      message: "Unable to load dashboard.",
    };

  }
};

export const getAllProducts = async (token) => {

  try {

    const response = await fetch(
      `${API}/admin/products`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return await response.json();

  } catch (error) {

    console.error(error);

    return {
      success: false,
      message: "Unable to load products.",
    };

  }

};

export const getAllUsers = async (token) => {

  try {

    const response = await fetch(
      `${API}/admin/users`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return await response.json();

  } catch (error) {

    console.error(error);

    return {
      success: false,
      message: "Unable to fetch users.",
    };

  }

};

export const updateUserRole = async (
  token,
  id,
  role
) => {

  try {

    const response = await fetch(
      `${API}/admin/users/${id}/role`,
      {

        method: "PATCH",

        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },

        body: JSON.stringify({
          role,
        }),

      }
    );

    return await response.json();

  } catch (error) {

    console.error(error);

    return {
      success: false,
      message: "Unable to update user.",
    };

  }

};

export const toggleUserStatus = async (
  token,
  id
) => {

  try {

    const response = await fetch(
      `${API}/admin/users/${id}/status`,
      {
        method: "PATCH",

        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return await response.json();

  } catch (error) {

    console.error(error);

    return {
      success: false,
      message: "Unable to update status.",
    };

  }

};

export const getAnalytics = async (token) => {

  try {

    const response = await fetch(
      `${API}/admin/analytics`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return await response.json();

  } catch (error) {

    console.error(error);

    return {
      success: false,
      message: "Unable to load analytics.",
    };

  }

};