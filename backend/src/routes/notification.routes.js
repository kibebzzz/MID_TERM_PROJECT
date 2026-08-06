import express from "express";

import{

  getMine,

  read,

  readAll,

    remove,
    clear,

} from "../controllers/notification.controller.js";

const router = express.Router();

router.get("/:userId",getMine);

router.patch("/:id/read",read);

router.patch("/read-all/:userId",readAll);

router.delete("/:id", remove);

router.delete("/user/:userId", clear);

export default router;