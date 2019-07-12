/* eslint-disable no-irregular-whitespace */
import { Schema, model } from "mongoose";

const matchSchema = new Schema({
  roundId: {
    type: Schema.Types.ObjectId,
    ref: "Round",
    required: true
  },
  startTime: { type: String, required: true, unique: true },
  teams: [
    {
      players: [{ type: String, ref: "Player" }],
      name: { type: String }
    },
    {
      players: [{ type: String, ref: "Player" }],
      name: { type: String }
    }
  ]
});

export default model.call(require("mongoose"), "Match", matchSchema);
