import { useState } from 'react';
import SearchForm from '../components/SearchForm';
import TrainCard from '../components/TrainCard';
import BookingModal from '../components/BookingModal';
import api from '../services/api';

const SearchPage = () => {
  const [trains, setTrains] = useState([]);
  const [selectedTrain, setSelectedTrain] = useState(null);
  const [travelDate, setTravelDate] = useState('');

  const handleSearch = async (query) => {
    const { data } = await api.get('/trains/search', { params: query });
    setTrains(data);
    setTravelDate(query.date);
  };

  const handleConfirmBooking = async (passengerName) => {
    await api.post('/bookings', {
      trainId: selectedTrain._id,
      passengerName,
      travelDate
    });
    setSelectedTrain(null);
    alert('Ticket booked successfully');
  };

  return (
    <section className="max-w-6xl mx-auto px-4 py-8 space-y-6">
      <SearchForm onSearch={handleSearch} />
      <div className="grid md:grid-cols-2 gap-4">
        {trains.map((train) => (
          <TrainCard key={train._id} train={train} onBook={setSelectedTrain} />
        ))}
      </div>
      {selectedTrain && (
        <BookingModal
          train={selectedTrain}
          onClose={() => setSelectedTrain(null)}
          onConfirm={handleConfirmBooking}
        />
      )}
    </section>
  );
};

export default SearchPage;
