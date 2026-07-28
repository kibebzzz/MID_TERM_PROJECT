import express from "express";
import {
  create,
  getAll,
  getOne,
  update,
  remove,
  getDashboardStats,
  getArtistProducts,
} from "../controllers/product.controller.js";

const router = express.Router();

router.post("/", create);

router.get("/", getAll);

router.get("/artist/:artistId/stats", getDashboardStats);

router.get("/artist/:artistId", getArtistProducts);

router.get("/:id", getOne);

router.put("/:id", update);

router.delete("/:id", remove);

export default router;