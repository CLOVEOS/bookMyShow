import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/authContext';

// Import all your page components
import { Navbar } from './components/navbar';
import { ProtectedRoute } from './components/protectedRoute';
import { Home } from './pages/home';
import { Login } from './pages/login';
import { MovieDetails } from './pages/movieDetails';
import { SeatSelection } from './pages/seatSelection';
import { Bookings } from './pages/booking';
import { AdminDashboard } from './pages/AdminDashboard';

function AppContent() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 antialiased flex flex-col">
      <Navbar />
      <main className="flex-grow">
        <Routes>
          {/* Public Authentication Screen */}
          <Route path="/login" element={<Login />} />

          {/* Secure Protected Customer Interfaces */}
          <Route path="/" element={<ProtectedRoute><Home /></ProtectedRoute>} />
          <Route path="/movie/:id" element={<ProtectedRoute><MovieDetails /></ProtectedRoute>} />
          <Route path="/show/:showId" element={<ProtectedRoute><SeatSelection /></ProtectedRoute>} />
          <Route path="/bookings" element={<ProtectedRoute><Bookings /></ProtectedRoute>} />

          {/* UNLOCKED ADMIN PANEL (Protected wrapper removed for immediate access!) */}
          <Route path="/admin" element={<AdminDashboard />} />

          {/* Universal Catch-all Fallback */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
    </div>
  );
}

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <AppContent />
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;