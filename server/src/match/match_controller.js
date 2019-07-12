import Model from "./match_model";

export default {
  list: (req, res, next) => {
    const { roundId } = req.query;
    console.log("THIS IS THE ROUND ID: ", roundId);
    Model.find({ roundId }, (err, matches) => {
      return res.json({ matches });
    });
  },

  create: (req, res, next) => {
    const { startTime, roundId, teams } = req.body;
    if (!startTime || !roundId || !teams) {
      return res.json({
        error: "Your must specify a start time and teams for the match."
      });
    }
    Model.findOne({ startTime, roundId }, function(err, existing) {
      if (err) return res.status(422).send(err);
      if (existing) {
        return res.json({ error: "Match with this time already exists." });
      }
      const round = new Model({ startTime, roundId, teams });
      round.save(function(err, savedModel) {
        if (err) {
          return next(err);
        }
        res.json({
          success: true,
          match: savedModel
        });
      });
    });
  },

  find: (req, res, next) => {
    const { startTime, roundId } = req.query;
    Model.findOne({ startTime, roundId }, function(err, foundModel) {
      if (err) return res.status(422).send(err);
      if (foundModel) {
        return res.json({ match: foundModel });
      } else {
        return res.status(404).send("Match not found");
      }
    });
  }
};
