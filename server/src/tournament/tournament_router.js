import TournamentController from "./tournament_controller";

const router = require("express").Router();

router.get("/", TournamentController.list);

router.post("/create", TournamentController.create);

router.get("/find", TournamentController.find);

export default router;
