import Model from "./player_model";

export default {
  list: (req, res, next) => {
    Model.find({}, (err, players) => {
      return res.json({ players });
    });
  },
  create: (req, res, next) => {
    const { name, email } = req.body;
    if (!name || !email) {
      return res.status(422).send({
        error: "Your must specify a name and email for the player."
      });
    }
    Model.findOne({ name, email }, function(err, existing) {
      if (err) return res.status(422).json(err);
      if (existing) {
        return res.json({
          error: "Player with this name or email already exists."
        });
      }
      const player = new Model({ name, email });
      player.save(function(err, savedModel) {
        if (err) {
          return next(err);
        }
        res.json({
          player: savedModel,
          error: null
        });
      });
    });
  },

  find: (req, res, next) => {
    const { name, email } = req.query;
    Model.findOne({ name, email }, function(err, foundModel) {
      if (err) return res.status(422).send(err);
      if (foundModel) {
        return res.json({ player: foundModel });
      } else {
        return res.status(404).send("Player not found");
      }
    });
  }
};
