import { useContext, useState } from 'react';
import { AuthContext } from '../context/AuthContext';
import axios from '../api/axios';

export default function Profile() {
  const { user, setUser } = useContext(AuthContext);
  const [username, setUsername] = useState(user.username);
  const [file, setFile] = useState(null);

  const save = async (e) => {
    e.preventDefault();
    const fd = new FormData();
    fd.append('username', username);
    if (file) fd.append('avatar', file);
    const { data } = await axios.patch('/users/me', fd, { headers: { 'Content-Type': 'multipart/form-data' } });
    setUser(data);
    alert('Saved');
  };

  return (
    <div className="p-4 max-w-md mx-auto">
      <h1 className="text-2xl font-bold mb-4">Profile</h1>
      <form onSubmit={save} className="space-y-4">
        <img src={'http://localhost:5000' + (user.avatar || '/uploads/avatar/default.png')} className="w-24 h-24 rounded-full mx-auto" />
        <input type="file" className="file-input file-input-bordered w-full" onChange={(e) => setFile(e.target.files[0])} />
        <input className="input input-bordered w-full" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} />
        <input className="input input-bordered w-full" disabled value={user.email} />
        <button className="btn btn-primary w-full">Save</button>
      </form>
    </div>
  );
}