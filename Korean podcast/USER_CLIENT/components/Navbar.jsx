import { Link } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

export default function Navbar() {
  const { user, logout } = useContext(AuthContext);

  return (
    <div className="navbar mb-4 shadow-lg bg-neutral text-neutral-content">
      <div className="flex-1 px-2 mx-2">
        <Link to="/" className="text-lg font-bold">🇰🇷 Korean Listening</Link>
      </div>
      <div className="flex-none px-2 mx-2">
        {user ? (
          <>
            <Link to="/favourites" className="btn btn-ghost btn-sm">Favourites</Link>
            <Link to="/profile" className="btn btn-ghost btn-sm">Profile</Link>
            <button onClick={logout} className="btn btn-ghost btn-sm">Logout</button>
          </>
        ) : (
          <>
            <Link to="/login" className="btn btn-ghost btn-sm">Login</Link>
            <Link to="/register" className="btn btn-ghost btn-sm">Register</Link>
          </>
        )}
      </div>
    </div>
  );
}