import Model from "./match_model";

export default {
  list: (req, res, next) => {
    Model.find({}, (err, matches) => {
      return res.json({ matches });
    });
  },
  create: (req, res, next) => {
    const { date, tournamentId } = req.body;
    if (!date || !tournamentId) {
      return res.status(422).send({
        error: "Your must specify a date for the match."
      });
    }
    Model.findOne({ date, tournamentId }, function(err, existing) {
      if (err) return res.status(422).send(err);
      if (existing) {
        return res
          .status(422)
          .send({ error: "Match with this time already exists." });
      }
      const round = new Model({ date, tournamentId });
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
    const { date, tournamentId } = req.query;
    Model.findOne({ date, tournamentId }, function(err, foundModel) {
      if (err) return res.status(422).send(err);
      if (foundModel) {
        return res.json({ match: foundModel });
      } else {
        return res.status(404).send("Match not found");
      }
    });
  }
};
