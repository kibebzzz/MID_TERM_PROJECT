import { Router } from "express";
import { authenticate } from "../middlewares/auth.middleware.js";

import {
  getProfile,
  updateArtistProfile,
  getArtistProfile,
  getArtists,
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

export default router;