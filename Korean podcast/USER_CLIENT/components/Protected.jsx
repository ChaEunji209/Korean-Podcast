import { Navigate, Outlet } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

export default function Protected() {
  const { user, loading } = useContext(AuthContext);
  if (loading) return <div className="p-4">Loading…</div>;
  return user ? <Outlet /> : <Navigate to="/login" />;
}