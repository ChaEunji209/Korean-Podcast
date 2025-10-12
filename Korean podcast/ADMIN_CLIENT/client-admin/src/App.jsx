import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import PodcastList from './pages/PodcastList';
import PodcastForm from './pages/PodcastForm';
import FeedbackList from './pages/FeedbackList';
import { useEffect, useState } from 'react';
import axios from './api/axios';

export default function App() {
  const [admin, setAdmin] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('adminToken');
    if (token) {
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      axios.get('/users/me').then(({ data }) => {
        if (data.isAdmin) setAdmin(data); else localStorage.removeItem('adminToken');
      }).finally(() => setLoading(false));
    } else setLoading(false);
  }, []);

  if (loading) return <div className="p-4">Loading…</div>;
  if (!admin) return <Login onLogin={(token, u) => { localStorage.setItem('adminToken', token); setAdmin(u); }} />;

  return (
    <div className="flex">
      <aside className="w-64 bg-base-200 min-h-screen p-4 space-y-2">
        <h1 className="text-xl font-bold">Admin</h1>
        <a href="#/podcasts" className="btn btn-sm btn-block btn-ghost">Podcasts</a>
        <a href="#/feedback" className="btn btn-sm btn-block btn-ghost">Feedback</a>
        <button onClick={() => { localStorage.removeItem('adminToken'); window.location = '/'; }} className="btn btn-sm btn-block btn-ghost">Logout</button>
      </aside>
      <main className="flex-1 p-4">
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/podcasts" element={<PodcastList />} />
          <Route path="/podcasts/new" element={<PodcastForm />} />
          <Route path="/podcasts/edit/:id" element={<PodcastForm />} />
          <Route path="/feedback" element={<FeedbackList />} />
        </Routes>
      </main>
    </div>
  );
}