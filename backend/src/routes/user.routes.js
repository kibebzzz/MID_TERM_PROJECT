import { Router } from "express";
import {
  authenticate,
  authorize,
} from "../middlewares/auth.middleware.js";

import {
  getProfile,
  updateArtistProfile,
  getArtistProfile,
  getArtists,
    getAllVerificationRequests,
    reviewArtistVerification,
} from "../controllers/user.controller.js";

const router = Router();

router.get("/profile", authenticate, getProfile);

// Public
router.get("/artists", getArtists);
router.get("/artists/:id", getArtistProfile);

// Artist Settings
router.put(
  "/artists/profile",
  authenticate,
  updateArtistProfile
);

router.get(
  "/verification-requests",
  authenticate,
  authorize("ADMIN"),
  getAllVerificationRequests
);

router.put(
  "/verification/:id",
  authenticate,
  authorize("ADMIN"),
  reviewArtistVerification
);

export default router;