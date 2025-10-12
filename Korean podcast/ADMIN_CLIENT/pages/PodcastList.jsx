import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from '../api/axios';

export default function PodcastList() {
  const [list, setList] = useState([]);
  useEffect(() => { axios.get('/podcasts').then(r => setList(r.data.podcasts)); }, []);

  const remove = async (id) => {
    if (!confirm('Delete?')) return;
    await axios.delete('/admin/podcasts/' + id);
    setList(list.filter((x) => x._id !== id));
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Podcasts</h1>
        <Link className="btn btn-primary btn-sm" to="/podcasts/new">Add new</Link>
      </div>
      <table className="table w-full">
        <thead>
          <tr>
            <th>Title</th>
            <th />
          </tr>
        </thead>
        <tbody>
          {list.map((p) => (
            <tr key={p._id}>
              <td>{p.title}</td>
              <td className="space-x-2">
                <Link className="btn btn-sm" to={'/podcasts/edit/' + p._id}>Edit</Link>
                <button onClick={() => remove(p._id)} className="btn btn-sm btn-error">
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}