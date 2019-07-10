import RoundController from "./round_controller";

const router = require("express").Router();

router.get("/", RoundController.list);

router.post("/create", RoundController.create);

router.get("/find", RoundController.find);

export default router;
