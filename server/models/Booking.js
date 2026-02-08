import mongoose from 'mongoose';

const bookingSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    train: { type: mongoose.Schema.Types.ObjectId, ref: 'Train', required: true },
    passengerName: { type: String, required: true },
    travelDate: { type: Date, required: true },
    pnr: { type: String, required: true, unique: true },
    status: { type: String, enum: ['booked', 'cancelled'], default: 'booked' }
  },
  { timestamps: true }
);

export default mongoose.model('Booking', bookingSchema);
