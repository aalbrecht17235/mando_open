/* eslint-disable no-irregular-whitespace */
import { Schema, model } from "mongoose";

const playerSchema = new Schema({
  name: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  phone: { type: String }
});

export default model.call(require("mongoose"), "Player", playerSchema);
