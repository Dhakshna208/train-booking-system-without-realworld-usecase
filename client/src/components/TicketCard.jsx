const TicketCard = ({ booking, onCancel }) => (
  <div className="bg-white rounded-xl shadow p-4 border border-blue-100">
    <p className="text-sm text-grayText">Train: {booking.train?.name}</p>
    <p className="text-sm text-grayText">Passenger: {booking.passengerName}</p>
    <p className="text-sm text-grayText">Travel Date: {new Date(booking.travelDate).toLocaleDateString()}</p>
    <p className="mt-2 text-primaryBlue font-bold">PNR: {booking.pnr}</p>
    <button onClick={() => onCancel(booking._id)} className="mt-3 bg-red-500 text-white px-3 py-2 rounded-lg">Cancel Ticket</button>
  </div>
);

export default TicketCard;
