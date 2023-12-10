import { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { pick } from 'lodash'

const Login = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  function handleMe() {
    setLoading(true);
    axios({
      method: 'get',
      url: 'http://localhost:8080/users/me',
    }).then(async (res) => {
      localStorage.setItem('user', JSON.stringify(pick(res.data, ['id', 'display_name', 'country', 'product', 'images'])));
      setLoading(false);
      navigate('/?welcome=true')
    });
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