/* eslint-disable no-irregular-whitespace */
// import * as mongoose from 'mongoose';
import { Schema, model } from "mongoose";

const tournamentSchema = new Schema({
  name: { type: String, required: true, unique: true },
  date: { type: Date, required: true },
  winner: { type: Schema.Types.ObjectId, ref: "Player" },
  players: [{ type: Schema.Types.ObjectId, ref: "Player" }],
  rounds: [{ type: Schema.Types.ObjectId, ref: "Round" }]
});

export default model.call(require("mongoose"), "Tournament", tournamentSchema);
