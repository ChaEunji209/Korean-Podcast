import { useEffect, useState } from 'react';
import axios from '../api/axios';
import { Link } from 'react-router-dom';

export default function Home() {
  const [list, setList] = useState([]);
  const [q, setQ] = useState('');

  useEffect(() => {
    axios.get('/podcasts?q=' + q).then(r => setList(r.data.podcasts));
  }, [q]);

  return (
    <div className="p-4 grid md:grid-cols-3 gap-4">
      <input
        className="md:col-span-3 input input-bordered"
        placeholder="Search title / description"
        value={q}
        onChange={(e) => setQ(e.target.value)}
      />
      {list.map((p) => (
        <div key={p._id} className="card shadow">
          <div className="card-body">
            <h2 className="card-title">{p.title}</h2>
            <p className="text-sm">{p.description}</p>
            <Link className="btn btn-primary btn-sm" to={`/podcast/${p._id}`}>
              Listen
            </Link>
          </div>
        </div>
      ))}
    </div>
  );
}