import React, { useState } from 'react';
import API from '../services/api';

export const AdminDashboard: React.FC = () => {
  // Movie Form State
  const [title, setTitle] = useState('');
  const [genre, setGenre] = useState('');
  const [duration, setDuration] = useState('');
  const [description, setDescription] = useState('');

  // Showtime Form State
  const [movieId, setMovieId] = useState('');
  const [startTime, setStartTime] = useState('');
  const [price, setPrice] = useState('');

  const handleCreateMovie = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await API.post('/movies/', { title, genre, duration: Number(duration), description });
      alert('Movie successfully added to catalog!');
      setTitle(''); setGenre(''); setDuration(''); setDescription('');
    } catch (err) {
      alert('Error creating entry.');
    }
  };

  const handleCreateShow = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      // Formats data to match backend requirements
      await API.post('/movies/shows/', {
        movie_id: Number(movieId),
        start_time: new Date(startTime).toISOString(),
        price: Number(price)
      });
      alert('Showtime schedule successfully published!');
      setMovieId(''); setStartTime(''); setPrice('');
    } catch (err) {
      alert('Error creating show schedule. Ensure the Movie ID exists.');
    }
  };

  return (
    <div className="max-w-2xl mx-auto px-6 py-12 space-y-12">
      <h2 className="text-3xl font-black text-white mb-4">Admin Dashboard</h2>
      
      {/* FORM 1: ADD NEW MOVIE */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-8">
        <h3 className="text-xl font-bold mb-6 text-red-500">Add New Movie Asset</h3>
        <form onSubmit={handleCreateMovie} className="space-y-4">
          <div>
            <label className="block text-xs font-bold uppercase text-gray-400 mb-1">Movie Title</label>
            <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} required className="w-full bg-slate-800 border border-slate-700 rounded p-3 text-white focus:outline-none focus:border-red-500" />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold uppercase text-gray-400 mb-1">Genre</label>
              <input type="text" value={genre} onChange={(e) => setGenre(e.target.value)} required className="w-full bg-slate-800 border border-slate-700 rounded p-3 text-white focus:outline-none focus:border-red-500" />
            </div>
            <div>
              <label className="block text-xs font-bold uppercase text-gray-400 mb-1">Duration (Mins)</label>
              <input type="number" value={duration} onChange={(e) => setDuration(e.target.value)} required className="w-full bg-slate-800 border border-slate-700 rounded p-3 text-white focus:outline-none focus:border-red-500" />
            </div>
          </div>
          <div>
            <label className="block text-xs font-bold uppercase text-gray-400 mb-1">Description Synopsis</label>
            <textarea value={description} onChange={(e) => setDescription(e.target.value)} required rows={4} className="w-full bg-slate-800 border border-slate-700 rounded p-3 text-white focus:outline-none focus:border-red-500 resize-none"></textarea>
          </div>
          <button type="submit" className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-3 rounded transition-colors mt-2">
            Publish to Storefront
          </button>
        </form>
      </div>

      {/* FORM 2: CREATE SHOW SCHEDULE */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-8">
        <h3 className="text-xl font-bold mb-6 text-blue-500">Create Show Schedule</h3>
        <form onSubmit={handleCreateShow} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold uppercase text-gray-400 mb-1">Movie ID</label>
              <input type="number" placeholder="e.g. 1" value={movieId} onChange={(e) => setMovieId(e.target.value)} required className="w-full bg-slate-800 border border-slate-700 rounded p-3 text-white focus:outline-none focus:border-blue-500" />
            </div>
            <div>
              <label className="block text-xs font-bold uppercase text-gray-400 mb-1">Ticket Price ($)</label>
              <input type="number" placeholder="e.g. 12" value={price} onChange={(e) => setPrice(e.target.value)} required className="w-full bg-slate-800 border border-slate-700 rounded p-3 text-white focus:outline-none focus:border-blue-500" />
            </div>
          </div>
          <div>
            <label className="block text-xs font-bold uppercase text-gray-400 mb-1">Date & Time</label>
            <input type="datetime-local" value={startTime} onChange={(e) => setStartTime(e.target.value)} required className="w-full bg-slate-800 border border-slate-700 rounded p-3 text-white focus:outline-none focus:border-blue-500" />
          </div>
          <button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded transition-colors mt-2">
            Publish Showtime Schedule
          </button>
        </form>
      </div>

    </div>
  );
};