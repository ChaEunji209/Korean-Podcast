import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from '../api/axios';

export default function PodcastForm() {
  const nav = useNavigate();
  const { id } = useParams();
  const [form, setForm] = useState({ title: '', description: '', transcriptKr: '', transcriptMy: '' });
  const [file, setFile] = useState(null);

  useEffect(() => {
    if (id) axios.get('/podcasts/' + id).then((r) => setForm(r.data.podcast));
  }, [id]);

  const save = async (e) => {
    e.preventDefault();
    const fd = new FormData();
    Object.keys(form).forEach((k) => fd.append(k, form[k]));
    if (file) fd.append('audio', file);
    if (id) await axios.patch('/admin/podcasts/' + id, fd, { headers: { 'Content-Type': 'multipart/form-data' } });
    else await axios.post('/admin/podcasts', fd, { headers: { 'Content-Type': 'multipart/form-data' } });
    nav('/podcasts');
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">{id ? 'Edit' : 'New'} Podcast</h1>
      <form onSubmit={save} className="space-y-4 max-w-2xl">
        <input className="input input-bordered w-full" placeholder="Title" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} required />
        <textarea className="textarea textarea-bordered w-full" placeholder="Description" value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} />
        {!id && (
          <input type="file" className="file-input file-input-bordered w-full" accept="audio/*" onChange={(e) => setFile(e.target.files[0])} required />
        )}
        <textarea className="textarea textarea-bordered w-full" placeholder="Korean transcript" rows={6} value={form.transcriptKr} onChange={(e) => setForm({ ...form, transcriptKr: e.target.value })} />
        <textarea className="textarea textarea-bordered w-full" placeholder="Burmese transcript" rows={6} value={form.transcriptMy} onChange={(e) => setForm({ ...form, transcriptMy: e.target.value })} />
        <button className="btn btn-primary">{id ? 'Update' : 'Create'}</button>
      </form>
    </div>
  );
}