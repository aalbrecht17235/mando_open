import TournamentController from './tournament_controller';

const router = require('express').Router();

router.post('/tournament/create', TournamentController.create);

export default router;