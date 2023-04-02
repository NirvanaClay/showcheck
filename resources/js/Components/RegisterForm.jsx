import axios from '../axiosConfig';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom'

const RegisterForm = ({ setUser, setLoginStatus, passwordVisibility, setPasswordVisibility, changePasswordVisibility }) => {
  const navigate = useNavigate();

  const addUser = async (e) => {
    e.preventDefault();
    await axios.post('register', {
      email: e.target[0].value,
      password: e.target[1].value,
      password_confirmation: e.target[2].value
    })
    .then((e) => {
      setLoginStatus(true)
      navigate('/', { replace: true })
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
            <i className={`fas fa-eye${!passwordVisibility ? '-slash' : ''}`} onClick={changePasswordVisibility}></i>
          </div>
        </div>
        <div className='field'>
          <label htmlFor='password_confirmation'>Confirm Password</label>
          <input type = {`${!passwordVisibility ? 'password' : 'text'}`} name='password'  autoComplete='off' />
        </div>
        <input type='submit' value='Register' />
      </form>
    </div>
  )
}

export default RegisterForm
