import { useEffect, useState } from 'react';
import axios from '../api/axios';

export default function FeedbackList() {
  const [list, setList] = useState([]);
  useEffect(() => { axios.get('/admin/feedback').then((r) => setList(r.data)); }, []);

  const remove = async (id) => {
    if (!confirm('Delete?')) return;
    await axios.delete('/admin/feedback/' + id);
    setList(list.filter((x) => x._id !== id));
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Feedback</h1>
      <table className="table w-full">
        <thead>
          <tr>
            <th>User</th>
            <th>Podcast</th>
            <th>Rating</th>
            <th>Comment</th>
            <th />
          </tr>
        </thead>
        <tbody>
          {list.map((f) => (
            <tr key={f._id}>
              <td>{f.user.username}</td>
              <td>{f.podcast.title}</td>
              <td>{f.rating}</td>
              <td>{f.comment}</td>
              <td>
                <button onClick={() => remove(f._id)} className="btn btn-xs btn-error">
                  Del
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}