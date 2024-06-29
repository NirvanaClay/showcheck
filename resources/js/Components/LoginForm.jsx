import { Link, useNavigate } from 'react-router-dom'
import axios from '../axiosConfig'

const LoginForm = ({ setLoginStatus, passwordVisibility, setPasswordVisibility, changePasswordVisibility, loginError, setLoginError }) => {
  const navigate = useNavigate()
  
  const loginUser = async (e) => {
    e.preventDefault();
    let data = {
      email: e.target[0].value,
      password: e.target[1].value
    }
    axios.post('login', data)
    .then((e) => {
      setLoginStatus(true)
      setPasswordVisibility(false)
      navigate('/', { replace: true })
    })
    .catch((e) => {
      setLoginError(e.response.data.message)
    })
  }
  return(
    <>
      <div className='loginForm'>
        <h1>Log In</h1>
        <form onSubmit={loginUser}>
          <div className='field'>
            <label htmlFor='email'>Email</label>
            <input type ='text' name='email' />
          </div>
          <div className='field'>
            <label htmlFor='password'>Password</label>
            <input type = {`${!passwordVisibility ? 'password' : 'text'}`} name='password'  autoComplete='off' />
            <div className='visibility-container'>
              <i className={`fas fa-eye${!passwordVisibility ? '-slash' : ''}`} onClick={() => {changePasswordVisibility('original')}}></i>
            </div>
          </div>
          <Link to='/forgot-password'>
              Forgot your password?
          </Link>
          <input type='submit' value='Login' />
        </form>
        {loginError &&
          <p>{loginError}</p>
        }
      </div>
    </>
  )
}

export default LoginForm;