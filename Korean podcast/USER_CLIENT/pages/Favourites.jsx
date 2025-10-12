import { useEffect, useState } from 'react';
import axios from '../api/axios';
import { Link } from 'react-router-dom';

export default function Favourites() {
  const [list, setList] = useState([]);

  useEffect(() => {
    axios.get('/users/me/favourites').then((r) => setList(r.data));
  }, []);

  return (
    <div className="p-4 grid md:grid-cols-3 gap-4">
      <h1 className="md:col-span-3 text-2xl font-bold">My Favourites</h1>
      {list.map((p) => (
        <div key={p._id} className="card shadow">
          <div className="card-body">
            <h2 className="card-title">{p.title}</h2>
            <p className="text-sm">{p.description}</p>
            <Link className="btn btn-sm btn-primary" to={`/podcast/${p._id}`}>
              Listen
            </Link>
          </div>
        </div>
      ))}
    </div>
  );
}