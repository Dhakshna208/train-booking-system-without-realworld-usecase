import React, { useState } from 'react';

const BookingModal = ({ train, onClose, onConfirm }) => {
  const [passengerName, setPassengerName] = useState('');

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center p-4">
      <div className="bg-white rounded-xl shadow-lg p-5 w-full max-w-md">
        <h2 className="text-lg font-semibold text-darkBlue">Book {train.name}</h2>
        <input
          className="mt-3 w-full border border-blue-200 rounded-lg p-2"
          placeholder="Passenger Name"
          value={passengerName}
          onChange={(e) => setPassengerName(e.target.value)}
        />
        <div className="flex justify-end gap-2 mt-4">
          <button onClick={onClose} className="px-3 py-2 rounded-lg border">Cancel</button>
          <button
            onClick={() => onConfirm(passengerName)}
            className="px-3 py-2 rounded-lg bg-primaryBlue text-white disabled:opacity-50"
            disabled={!passengerName.trim()}
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
};

export default BookingModal;
