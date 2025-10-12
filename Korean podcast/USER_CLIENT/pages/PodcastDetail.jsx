import { useEffect, useState, useContext } from 'react';
import { useParams } from 'react-router-dom';
import axios from '../api/axios';
import { AuthContext } from '../context/AuthContext';

export default function PodcastDetail() {
  const { id } = useParams();
  const { user } = useContext(AuthContext);
  const [p, setP] = useState(null);
  const [stats, setStats] = useState({});
  const [feed, setFeed] = useState([]);
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState('');

  useEffect(() => {
    axios.get('/podcasts/' + id).then((r) => {
      setP(r.data.podcast);
      setStats(r.data.stats);
    });
    axios.get('/feedback/podcast/' + id).then((r) => setFeed(r.data));
  }, [id]);

  const addFav = async () => {
    await axios.post('/users/me/favourites', { podcastId: id });
    alert('Added to favourites');
  };

  const submitFeedback = async (e) => {
    e.preventDefault();
    await axios.post('/feedback', { podcastId: id, rating, comment });
    window.location.reload();
  };

  if (!p) return <div className="p-4">Loading…</div>;

  return (
    <div className="p-4 max-w-3xl mx-auto space-y-4">
      <h1 className="text-2xl font-bold">{p.title}</h1>
      <p className="text-sm text-gray-600">{p.description}</p>

      <audio controls className="w-full" src={'http://localhost:5000' + p.audioUrl} />

      <div className="flex gap-2">
        {user && (
          <>
            <button className="btn btn-primary btn-sm" onClick={addFav}>★ Add fav</button>
          </>
        )}
        <span className="text-sm self-center">⭐ {stats.avg?.toFixed(1)} ({stats.count} reviews)</span>
      </div>

      <details open className="collapse collapse-arrow border">
        <summary className="collapse-title">Korean Transcript</summary>
        <pre className="collapse-content whitespace-pre-wrap">{p.transcriptKr}</pre>
      </details>
      <details className="collapse collapse-arrow border">
        <summary className="collapse-title">Burmese Transcript</summary>
        <pre className="collapse-content whitespace-pre-wrap">{p.transcriptMy}</pre>
      </details>

      <div className="divider">Feedback</div>
      <div className="space-y-2">
        {feed.map((f) => (
          <div key={f._id} className="flex gap-3 items-start">
            <img src={'http://localhost:5000' + (f.user.avatar || '/uploads/avatar/default.png')} className="w-10 h-10 rounded-full" />
            <div>
              <div className="flex gap-2 items-center">
                <span className="font-semibold">{f.user.username}</span>
                <span className="text-sm">⭐{f.rating}</span>
              </div>
              <p className="text-sm">{f.comment}</p>
            </div>
          </div>
        ))}
      </div>

      {user && (
        <form onSubmit={submitFeedback} className="space-y-2">
          <select className="select select-bordered w-24" value={rating} onChange={(e) => setRating(e.target.value)}>
            {[1, 2, 3, 4, 5].map((v) => (
              <option key={v}>{v}</option>
            ))}
          </select>
          <textarea className="textarea textarea-bordered w-full" placeholder="Comment (optional)" value={comment} onChange={(e) => setComment(e.target.value)} />
          <button className="btn btn-primary btn-sm">Submit</button>
        </form>
      )}
    </div>
  );
}