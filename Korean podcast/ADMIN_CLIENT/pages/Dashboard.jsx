import { useEffect, useState } from 'react';
import axios from '../api/axios';

export default function Dashboard() {
  const [stats, setStats] = useState({});
  useEffect(() => {
    Promise.all([
      axios.get('/podcasts').then(r => r.data.total),
      axios.get('/users/me').then(r => r.data),
    ]).then(([total]) => setStats({ total }));
  }, []);
  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Dashboard</h1>
      <div className="stats shadow">
        <div className="stat">
          <div className="stat-title">Total Podcasts</div>
          <div className="stat-value">{stats.total}</div>
        </div>
      </div>
    </div>
  );
}