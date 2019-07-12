import Model from "./match_model";

export default {
  list: (req, res, next) => {
    Model.find({}, (err, matches) => {
      return res.json({ matches });
    });
  },

  create: (req, res, next) => {
    const { startTime, roundId } = req.body;
    if (!startTime || !roundId) {
      return res.status(422).json({
        error: "Your must specify a date for the match."
      });
    }
    Model.findOne({ startTime, roundId }, function(err, existing) {
      if (err) return res.status(422).send(err);
      if (existing) {
        console.log("FOUND MATCHING MATCH");
        res.json({ error: "Match with this time already exists." });
      }
      const round = new Model({ startTime, roundId });
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
