import {
  getLoggedInUser,
  getAllArtists,
  getArtistById,
  updateProfile,
getVerificationRequests,
    reviewVerification,
} from "../services/user.service.js";

export const getProfile = async (req, res) => {
  const user = await getLoggedInUser(req.user.id);

  res.json({
    success: true,
    data: user,
  });
};

export const getArtists = async (req, res) => {
  const artists = await getAllArtists();

  res.json({
    success: true,
    data: artists,
  });
};

export const getArtistProfile = async (req, res) => {
  const artist = await getArtistById(req.params.id);

  if (!artist) {
    return res.status(404).json({
      success: false,
      message: "Artist not found.",
    });
  }

  res.json({
    success: true,
    data: artist,
  });
};

export const updateArtistProfile = async (req, res) => {
  const profile = await updateProfile(
    req.user.id,
    req.body
  );

  res.json({
    success: true,
    message: "Profile updated.",
    data: profile,
  });
};

export const getAllVerificationRequests = async (req, res) => {
  try {

    const requests = await getVerificationRequests();

    res.status(200).json({
      success: true,
      data: requests,
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};

export const reviewArtistVerification = async (req, res) => {
  try {

    const {
      verificationStatus,
      verificationNotes,
    } = req.body;

    const profile = await reviewVerification(
      req.params.id,
      verificationStatus,
      verificationNotes
    );

    res.status(200).json({
      success: true,
      message: "Verification updated successfully.",
      data: profile,
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};