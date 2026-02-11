import React, { useEffect, useState } from 'react';
import TicketCard from '../components/TicketCard';
import api from '../services/api';

const MyBookingsPage = () => {
  const [bookings, setBookings] = useState([]);

  const loadBookings = async () => {
    const { data } = await api.get('/bookings/my');
    setBookings(data);
  };

  useEffect(() => {
    loadBookings();
  }, []);

  const cancelBooking = async (bookingId) => {
    await api.delete(`/bookings/${bookingId}`);
    loadBookings();
  };

  return (
    <section className="max-w-5xl mx-auto px-4 py-8 grid md:grid-cols-2 gap-4">
      {bookings.map((booking) => (
        <TicketCard key={booking._id} booking={booking} onCancel={cancelBooking} />
      ))}
    </section>
  );
};

export default MyBookingsPage;
