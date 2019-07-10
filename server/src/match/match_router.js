import MatchController from "./match_controller";

const router = require("express").Router();

router.get("/", MatchController.list);

router.post("/create", MatchController.create);

router.get("/find", MatchController.find);

export default router;
