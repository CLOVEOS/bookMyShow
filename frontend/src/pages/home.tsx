import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import API from '../services/api';

interface Movie {
  id: number;
  title: string;
  genre: string;
  duration: number;
  description: string;
}

// Ensure this matches 'export const Home' exactly
export const Home: React.FC = () => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    API.get('/movies/')
      .then((res) => { 
        setMovies(res.data); 
        setLoading(false); 
      })
      .catch(() => setLoading(false));
  }, []);

  if (loading) return <div className="text-center py-20 text-xl">Loading catalog matrices...</div>;

  return (
    <div className="max-w-7xl mx-auto px-6 py-10">
      <h1 className="text-3xl font-black mb-8 text-white tracking-tight">Now Showing</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {movies.map((movie) => (
          <div key={movie.id} className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden hover:shadow-2xl hover:border-slate-700 transition-all flex flex-col justify-between">
            <div className="p-6">
              <span className="text-xs font-bold uppercase tracking-widest text-red-500 bg-red-500/10 px-2.5 py-1 rounded">
                {movie.genre}
              </span>
              <h3 className="text-xl font-bold mt-3 text-white line-clamp-1">{movie.title}</h3>
              <p className="text-gray-400 text-sm mt-2 line-clamp-3">{movie.description}</p>
            </div>
            <div className="p-6 pt-0 border-t border-slate-800/50 flex items-center justify-between mt-4">
              <span className="text-xs text-gray-500 font-semibold">{movie.duration} mins</span>
              <Link to={`/movie/${movie.id}`} className="bg-slate-800 hover:bg-red-600 text-white font-bold px-4 py-2 rounded text-xs transition-colors">
                Book Tickets
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};