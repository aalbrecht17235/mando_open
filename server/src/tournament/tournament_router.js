import TournamentController from "./tournament_controller";

const router = require("express").Router();

router.post("/create", TournamentController.create);

export default router;
