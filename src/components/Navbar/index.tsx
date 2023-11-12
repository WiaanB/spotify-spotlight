import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import useAuth from '@/hooks/useAuth';

const Navbar: React.FC = () => {
  const user = useAuth();
  const navigate = useNavigate();

  function handleLogout() {
    localStorage.removeItem('user');
    navigate('/login');
  }

  return (
    <div className="navbar bg-base-100 border-2">
      <div className="flex-1">
        <a className="btn btn-ghost normal-case text-xl">Spotlight</a>
      </div>
      <div className="flex-none">
        <ul className="menu menu-horizontal px-1 items-center space-x-4">
          <li><Link to="/explorer">Playlist Explorer</Link></li>
          <li><Link to="/compare">Compare Tool</Link></li>
          <details className="dropdown dropdown-end">
            <summary className="btn btn-circle">
              <div className="avatar">
                <div className="w-24 rounded-full ring ring-green-400 ring-offset-base-100 ring-offset-2 h-12 w-12">
                  <img src={user.images[0].url} />
                </div>
              </div>
            </summary>
            <ul tabIndex={0} className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box">
              <li><a onClick={handleLogout}>Logout</a></li>
            </ul>
          </details>
        </ul>
      </div>
    </div>
  )
}

export default Navbar;