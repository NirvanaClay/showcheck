import axios from '../axiosConfig';
import { useNavigate } from 'react-router-dom'

const RegisterForm = ({ setLoginStatus, passwordVisibility, setPasswordVisibility, changePasswordVisibility, passwordConfirmVisibility, setPasswordConfirmVisibility, registerError, setRegisterError }) => {
  const navigate = useNavigate();

  const addUser = (e) => {
    e.preventDefault();
    axios.post('register', {
      email: e.target[0].value,
      password: e.target[1].value,
      password_confirmation: e.target[2].value
    })
    .then((e) => {
      setLoginStatus(true)
      setPasswordVisibility(false)
      setPasswordConfirmVisibility(false)
      navigate('/', { replace: true })
    })
    .catch((e) => {
      setRegisterError(e.response.data.message)
    })
  }

  return (
    <div className='register'>
      <h1>Register</h1>
      <form onSubmit={addUser} method="POST" action="/api/register" name='newUserForm' className='newUserForm'>
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
        <div className='field'>
          <label htmlFor='password_confirmation'>Confirm Password</label>
          <input type = {`${!passwordConfirmVisibility ? 'password' : 'text'}`} name='password'  autoComplete='off' />
          <div className='visibility-container'>
            <i className={`fas fa-eye${!passwordConfirmVisibility ? '-slash' : ''}`} onClick={() => {changePasswordVisibility('confirmation')}}></i>
          </div>
        </div>
        <input type='submit' value='Register' />
      </form>
      {registerError && 
        <p>{registerError}</p>
      }
    </div>
  )
}

export default RegisterForm
