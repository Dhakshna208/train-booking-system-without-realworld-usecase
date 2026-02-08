import Booking from '../models/Booking.js';
import Train from '../models/Train.js';

const generatePNR = () => `PNR${Date.now().toString().slice(-8)}${Math.floor(Math.random() * 90 + 10)}`;

export const createBooking = async (req, res) => {
  const { trainId, passengerName, travelDate } = req.body;
  if (!trainId || !passengerName || !travelDate) {
    return res.status(400).json({ message: 'trainId, passengerName and travelDate are required' });
  }

  const train = await Train.findById(trainId);

  if (!train || train.availableSeats <= 0) {
    return res.status(400).json({ message: 'No seats available' });
  }

  train.availableSeats -= 1;
  await train.save();

  const booking = await Booking.create({
    user: req.user.id,
    train: trainId,
    passengerName,
    travelDate,
    pnr: generatePNR()
  });

  return res.status(201).json(booking);
};

export const myBookings = async (req, res) => {
  const bookings = await Booking.find({ user: req.user.id, status: 'booked' }).populate('train');
  return res.json(bookings);
};

export const cancelBooking = async (req, res) => {
  const booking = await Booking.findOne({ _id: req.params.id, user: req.user.id, status: 'booked' });
  if (!booking) return res.status(404).json({ message: 'Booking not found' });

  booking.status = 'cancelled';
  await booking.save();

  const train = await Train.findById(booking.train);
  if (train) {
    train.availableSeats += 1;
    await train.save();
  }

  return res.json({ message: 'Ticket cancelled' });
};
