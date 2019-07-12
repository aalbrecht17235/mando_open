/* eslint-disable no-irregular-whitespace */
import { Schema, model } from "mongoose";

const matchSchema = new Schema({
  roundId: {
    type: Schema.Types.ObjectId,
    ref: "Round",
    required: true
  },
  startTime: { type: String, required: true },
  teams: {
    team1: {
      players: [{ type: Schema.Types.ObjectId, ref: "Player" }],
      name: { type: String, unique: true }
    },
    team2: {
      players: [{ type: Schema.Types.ObjectId, ref: "Player" }],
      name: { type: String, unique: true }
    }
  }
});

export default model.call(require("mongoose"), "Match", matchSchema);
