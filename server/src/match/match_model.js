/* eslint-disable no-irregular-whitespace */
import { Schema, model } from "mongoose";

const matchSchema = new Schema({
  roundtId: {
    type: Schema.Types.ObjectId,
    ref: "Round",
    required: true
  },
  startTime: { type: Date, required: true },
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
