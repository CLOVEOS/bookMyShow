import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import API from '../services/api';

const SEATS = ['A1', 'A2', 'A3', 'A4', 'B1', 'B2', 'B3', 'B4', 'C1', 'C2', 'C3', 'C4'];

export const SeatSelection: React.FC = () => {
  const { showId } = useParams<{ showId: string }>();
  const navigate = useNavigate();
  const [selectedSeats, setSelectedSeats] = useState<string[]>([]);
  const [bookedSeats, setBookedSeats] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    API.get(`/bookings/all`)
      .then((res) => {
        const bookingsForShow = res.data.filter((b: any) => b.show_id === Number(showId));
        const filled = bookingsForShow.flatMap((b: any) => b.seats.split(','));
        setBookedSeats(filled);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [showId]);

  const toggleSeat = (seat: string) => {
    if (bookedSeats.includes(seat)) return;
    setSelectedSeats((prev) =>
      prev.includes(seat) ? prev.filter((s) => s !== seat) : [...prev, seat]
    );
  };

  const handleBooking = async () => {
    try {
      await API.post('/bookings/', { show_id: Number(showId), seats: selectedSeats });
      alert('Tickets reserved completely!');
      navigate('/bookings');
    } catch (err: any) {
      alert(err.response?.data?.detail || 'Booking dropped unexpectedly.');
    }
  };

  if (loading) return <div className="text-center mt-20">Loading Show Schema Matrix...</div>;

  return (
    <div className="flex flex-col items-center min-h-screen bg-slate-950 text-white p-6">
      <div className="w-full max-w-md bg-slate-900 border border-slate-800 p-6 rounded-xl shadow-xl text-center">
        <h2 className="text-2xl font-bold mb-6 text-red-500">Pick Your Layout Seats</h2>
        
        <div className="w-full bg-blue-500 h-2 rounded shadow-md shadow-blue-500/50 mb-10"></div>
        <p className="text-xs text-gray-400 mb-8">SCREEN THIS WAY</p>

        <div className="grid grid-cols-4 gap-4 justify-center mb-8">
          {SEATS.map((seat) => {
            const isBooked = bookedSeats.includes(seat);
            const isSelected = selectedSeats.includes(seat);
            return (
              <button
                key={seat}
                disabled={isBooked}
                onClick={() => toggleSeat(seat)}
                className={`py-3 rounded-lg text-sm font-semibold transition-all ${
                  isBooked
                    ? 'bg-slate-800 text-gray-600 cursor-not-allowed'
                    : isSelected
                    ? 'bg-green-500 text-white transform scale-105'
                    : 'bg-slate-700 hover:bg-slate-600 text-gray-200'
                }`}
              >
                {seat}
              </button>
            );
          })}
        </div>

        <button
          disabled={selectedSeats.length === 0}
          onClick={handleBooking}
          className="w-full bg-red-600 hover:bg-red-700 disabled:bg-slate-800 disabled:text-gray-500 disabled:cursor-not-allowed text-white font-bold py-3 px-4 rounded-lg transition-colors"
        >
          Book {selectedSeats.length} Seat(s)
        </button>
      </div>
    </div>
  );
};