import TournamentModel from "./tournament_model";

export default {
  getTournaments: (req, res, next) => {
    TournamentModel.find({}, (err, tournaments) => {
      return res.json({ tournaments });
    });
  },
  create: (req, res, next) => {
    const { name, date } = req.body;
    console.log("Hits the tournament endpoint: ", req.body);
    if (!name || !date) {
      return res.status(422).send({
        error: "Your must specify a name and date for the tournament."
      });
    }
    TournamentModel.findOne({ name }, function(err, existingTournament) {
      if (err) return res.status(422).send(err);
      if (existingTournament) {
        return res
          .status(422)
          .send({ error: "Tournament with this name already exists." });
      }
      const tournament = new TournamentModel({
        name,
        date
      });
      tournament.save(function(err, savedTournament) {
        if (err) {
          return next(err);
        }
        res.json({
          success: true,
          tournament: savedTournament
        });
      });
    });
  },

  findTournament: (req, res, next) => {
    const { tournamentName } = req.query;
    TournamentModel.findOne({ name: tournamentName }, function(
      err,
      foundTournament
    ) {
      if (err) return res.status(422).send(err);
      if (foundTournament) {
        return res.json({ tournament: foundTournament });
      } else {
        return res.status(404).send("Tournament not found");
      }
    });
  }
};
