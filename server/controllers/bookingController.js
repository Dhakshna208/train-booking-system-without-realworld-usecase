import Booking from '../models/Booking.js';
import Train from '../models/Train.js';

const generatePNR = () => `PNR${Date.now().toString().slice(-8)}${Math.floor(Math.random() * 90 + 10)}`;

export const createBooking = async (req, res) => {
  const { trainId, passengerName, travelDate } = req.body;
  if (!trainId || !passengerName || !travelDate) {
    return res.status(400).json({ message: 'trainId, passengerName and travelDate are required' });
  }

  const normalizedPassengerName = passengerName.trim();
  if (!normalizedPassengerName) {
    return res.status(400).json({ message: 'Passenger name is required' });
  }

  const parsedTravelDate = new Date(travelDate);
  if (Number.isNaN(parsedTravelDate.getTime())) {
    return res.status(400).json({ message: 'Invalid travel date' });
  }

  const train = await Train.findOneAndUpdate(
    { _id: trainId, availableSeats: { $gt: 0 } },
    { $inc: { availableSeats: -1 } },
    { new: true }
  );

  if (!train) {
    return res.status(400).json({ message: 'No seats available' });
  }

  try {
    const booking = await Booking.create({
      user: req.user.id,
      train: trainId,
      passengerName: normalizedPassengerName,
      travelDate: parsedTravelDate,
      pnr: generatePNR()
    });

    return res.status(201).json(booking);
  } catch (error) {
    await Train.updateOne({ _id: trainId }, { $inc: { availableSeats: 1 } });
    throw error;
  }
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
