import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import API from '../services/api';

interface Show {
  id: number;
  start_time: string;
  price: number;
}

export const MovieDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [shows, setShows] = useState<Show[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    API.get(`/movies/${id}/shows`)
      .then((res) => { setShows(res.data); setLoading(false); })
      .catch(() => setLoading(false));
  }, [id]);

  if (loading) return <div className="text-center py-20 text-xl">Loading show timings...</div>;

  return (
    <div className="max-w-4xl mx-auto px-6 py-12">
      <h2 className="text-3xl font-black text-white mb-2">Available Shows</h2>
      <p className="text-gray-400 mb-8">Select a timing to begin seat configuration reservation.</p>

      {shows.length === 0 ? (
        <div className="bg-slate-900 border border-slate-800 rounded-lg p-8 text-center text-gray-400">
          No show schedules currently assigned for this title.
        </div>
      ) : (
        <div className="space-y-4">
          {shows.map((show) => (
            <div key={show.id} className="bg-slate-900 border border-slate-800 rounded-xl p-6 flex items-center justify-between hover:border-slate-700 transition-all">
              <div>
                <p className="text-lg font-bold text-white">
                  {new Date(show.start_time).toLocaleDateString(undefined, { weekday: 'long', month: 'short', day: 'numeric' })}
                </p>
                <p className="text-2xl font-black text-red-500 mt-1">
                  {new Date(show.start_time).toLocaleTimeString(undefined, { hour: '2-digit', minute: '2-digit' })}
                </p>
              </div>
              <div className="text-right">
                <p className="text-gray-400 text-sm font-semibold mb-2">${show.price.toFixed(2)} / Seat</p>
                <Link to={`/show/${show.id}`} className="inline-block bg-red-600 hover:bg-red-700 text-white font-bold px-6 py-2.5 rounded-lg text-sm transition-colors shadow-lg shadow-red-600/10">
                  Select Seats
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};