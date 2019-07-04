/* eslint-disable no-irregular-whitespace */
import mongoose from 'mongoose';

const tournamentSchema = new mongoose.Schema({
  _id: tournamentSchema.Types.ObjectId,
  name: String,
  date: {
    start: Date,
    end: Date
  },
  winner: { type: tournamentSchema.Types.ObjectId, ref: 'Player' },
  players:[{ type: tournamentSchema.Types.ObjectId, ref: 'Player' }],
  rounds:[{type: tournamentSchema.Types.ObjectId, ref: 'Round'}],
})

export default mongoose.model('Tournament', tournamentSchema);