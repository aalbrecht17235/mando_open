import Model from "./round_model";

export default {
  list: (req, res, next) => {
    Model.find({}, (err, rounds) => {
      return res.json({ rounds });
    });
  },
  create: (req, res, next) => {
    const { number } = req.body;
    if (!number) {
      return res.status(422).send({
        error: "Your must specify a number for the round."
      });
    }
    Model.findOne({ number }, function(err, existing) {
      if (err) return res.status(422).send(err);
      if (existing) {
        return res
          .status(422)
          .send({ error: "Round with this number already exists." });
      }
      const round = new Model({ number });
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
    const { number } = req.query;
    Model.findOne({ number }, function(err, foundModel) {
      if (err) return res.status(422).send(err);
      if (foundModel) {
        return res.json({ round: foundModel });
      } else {
        return res.status(404).send("Round not found");
      }
    });
  }
};
