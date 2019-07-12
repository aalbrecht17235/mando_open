import Model from "./round_model";
import MatchModel from "../match/match_model";

export default {
  list: (req, res, next) => {
    Model.find({}, (err, rounds) => {
      return res.json({ rounds });
    });
  },
  create: (req, res, next) => {
    const { number, tournamentId } = req.body;
    if (!number || !tournamentId) {
      return res.status(422).send({
        error: "Your must specify a number for the round."
      });
    }
    Model.findOne({ number, tournamentId }, function(err, existing) {
      if (err) return res.status(422).send(err);
      if (existing) {
        return res
          .status(422)
          .send({ error: "Round with this number already exists." });
      }
      const round = new Model({ number, tournamentId });
      round.save(function(err, savedModel) {
        if (err) {
          return next(err);
        }
        res.json({
          success: true,
          round: savedModel
        });
      });
    });
  },

  find: (req, res, next) => {
    const { number, tournamentId } = req.query;
    Model.findOne({ number, tournamentId }, function(err, foundModel) {
      if (err) return res.status(422).send(err);
      if (foundModel) {
        return res.json({ round: foundModel });
      } else {
        return res.status(404).send("Round not found");
      }
    });
  },

  deleteByNumber: (req, res, next) => {
    const { number } = req.query;
    Model.findOne({ number }, function(err, deletedModel) {
      if (err) return res.status(422).send(err);
      if (deletedModel) {
        const roundId = deletedModel._id;
        MatchModel.find({ roundId }, function(err, foundMatches) {
          console.log("Found matches for round: ", foundMatches);
          foundMatches.forEach(match =>
            match.remove(function(err, removedMatch) {
              if (err) {
                return res.json(
                  `Error occured while trying to delete match ${match.name}`
                );
              }
            })
          );
        });
        deletedModel.remove(function(err, deletedModel) {
          if (err) {
            return res.json("Error occured while trying to delete entity");
          }
          return res.json({ deleted: deletedModel });
        });
      } else {
        return res.status(404).send("Entity not found");
      }
    });
  }
};
