import mongoose from 'mongoose';

const trainSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    number: { type: String, required: true, unique: true },
    from: { type: String, required: true },
    to: { type: String, required: true },
    totalSeats: { type: Number, required: true },
    availableSeats: { type: Number, required: true },
    fare: { type: Number, required: true }
  },
  { timestamps: true }
);

export default mongoose.model('Train', trainSchema);
