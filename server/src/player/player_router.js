import PlayerController from "./player_controller";

const router = require("express").Router();

router.get("/", PlayerController.list);

router.post("/create", PlayerController.create);

router.get("/find", PlayerController.find);

export default router;
