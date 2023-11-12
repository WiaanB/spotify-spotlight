import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { pick } from 'lodash'

const Login = () => {
  const navigate = useNavigate();

  function handleMe() {
    axios({
      method: 'get',
      url: 'http://localhost:8080/me',
    }).then(async (res) => {
      localStorage.setItem('user', JSON.stringify(pick(res.data, ['id', 'display_name', 'country', 'product', 'images'])));
      navigate('/')
    });
  }

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="card w-96 h-50 shadow-xl flex flex-column align-center">
        <div className="card-body bg-slate-700 rounded-xl">
          <h2 className="card-title">Welcome to Spotlight</h2>
          <p>Log in to get going!</p>
          <div className="card-actions justify-end">
            <button className="btn bg-green-400 text-black hover:text-white" onClick={handleMe}>Login</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login;