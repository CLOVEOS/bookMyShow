import React, { useEffect, useState } from 'react';
import API from '../services/api';

interface Booking {
  id: number;
  seats: string;
  total_price: number;
  show: {
    start_time: string;
    movie: {
      title: string;
      genre: string;
    };
  };
}

export const Bookings: React.FC = () => {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    API.get('/bookings/user/history')
      .then((res) => { setBookings(res.data); setLoading(false); })
      .catch(() => setLoading(false));
  }, []);

  if (loading) return <div className="text-center py-20 text-xl">Loading your historical parameters...</div>;

  return (
    <div className="max-w-4xl mx-auto px-6 py-12">
      <h2 className="text-3xl font-black text-white mb-8">Your Booking History</h2>
      {bookings.length === 0 ? (
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-12 text-center text-gray-500">
          No ticket histories discovered. Go reserve a show!
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-6">
          {bookings.map((booking) => (
            <div key={booking.id} className="bg-slate-900 border border-slate-800 rounded-xl p-6 flex flex-col md:flex-row justify-between md:items-center gap-4">
              <div>
                <span className="text-xs font-bold tracking-wider text-red-400 uppercase bg-red-500/10 px-2 py-0.5 rounded">
                  {booking.show.movie.genre}
                </span>
                <h4 className="text-xl font-bold text-white mt-1.5">{booking.show.movie.title}</h4>
                <p className="text-gray-400 text-sm mt-1">
                  {new Date(booking.show.start_time).toLocaleString()}
                </p>
              </div>
              <div className="flex border-t md:border-t-0 border-slate-800 pt-4 md:pt-0 gap-8 justify-between items-center">
                <div>
                  <p className="text-xs text-gray-500 font-bold uppercase">Seats Assigned</p>
                  <p className="text-lg font-mono font-bold text-white tracking-wide">{booking.seats}</p>
                </div>
                <div className="text-right">
                  <p className="text-xs text-gray-500 font-bold uppercase">Paid Total</p>
                  <p className="text-xl font-black text-green-400">${booking.total_price.toFixed(2)}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};