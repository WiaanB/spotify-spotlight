import { useSpotify } from '@/hooks/useSpotify'
import { Scopes } from '@spotify/web-api-ts-sdk'
import { pick } from 'lodash';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const sdk = useSpotify(
    String(import.meta.env.VITE_SPOTIFY_CLIENT_ID), 
    String(import.meta.env.VITE_REDIRECT_TARGET), 
    Scopes.userDetails
  );

  async function handleMe() {
    setLoading(true);
    if (!sdk) return setLoading(false);
    const user = await sdk.currentUser.profile();
    setLoading(false);
    localStorage.setItem('user', JSON.stringify(pick(user, ['id', 'display_name', 'country', 'product', 'images'])));
    navigate('/?welcome=true');
  }

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="card w-96 h-50 shadow-xl flex flex-column align-center">
        <div className="card-body bg-slate-700 rounded-xl">
          <h2 className="card-title">Welcome to Spotlight</h2>
          <p>Log in to get going!</p>
          <div className="card-actions justify-end">
            <button className="btn bg-green-400 text-black hover:text-white w-24" onClick={handleMe}>
              { loading ? <span className="loading loading-spinner"></span> : 'Login'}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login;