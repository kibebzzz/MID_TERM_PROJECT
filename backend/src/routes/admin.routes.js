import { Router } from "express";

import {
  authenticate,
  authorize,
} from "../middlewares/auth.middleware.js";

import {
  dashboard,
  getProducts,
  getUsers,
  updateRole,
    toggleStatus,
    analytics,
} from "../controllers/admin.controller.js";

const router = Router();

router.use(authenticate);

router.use(authorize("ADMIN"));

router.get("/dashboard", dashboard);

router.get("/products", getProducts);

router.get("/users", getUsers);

router.patch(
  "/users/:id/role",
  updateRole
);

router.patch(
  "/users/:id/status",
  toggleStatus
);

router.get(
  "/analytics",
  analytics
);

export default router;