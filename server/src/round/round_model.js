/* eslint-disable no-irregular-whitespace */
import { Schema, model } from "mongoose";

const roundSchema = new Schema({
  tournamentId: {
    type: Schema.Types.ObjectId,
    ref: "Tournament",
    required: true
  },
  number: { type: Number, required: true, unique: true },
  matches: [{ type: Schema.Types.ObjectId, ref: "Match" }]
});

export default model.call(require("mongoose"), "Round", roundSchema);
