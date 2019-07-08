import TournamentController from "./tournament_controller";

const router = require("express").Router();

router.get("/", TournamentController.getTournaments);

router.post("/create", TournamentController.create);

router.get("/find", TournamentController.findTournament);

export default router;
