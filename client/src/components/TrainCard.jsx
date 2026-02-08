const TrainCard = ({ train, onBook }) => (
  <div className="bg-white rounded-xl shadow p-4 border border-blue-100">
    <h3 className="text-xl font-semibold text-darkBlue">{train.name}</h3>
    <p className="text-grayText">{train.number} • {train.from} → {train.to}</p>
    <p className="text-sm text-grayText mt-1">Seats: {train.availableSeats} | Fare: ₹{train.fare}</p>
    {onBook && (
      <button onClick={() => onBook(train)} className="mt-3 bg-primaryBlue text-white px-4 py-2 rounded-lg">
        Book Now
      </button>
    )}
  </div>
);

export default TrainCard;
