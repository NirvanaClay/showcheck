import { useEffect, useState } from 'react'
import { Navigate, useNavigate } from 'react-router-dom'

import axios from '../axiosConfig'

const LoginForm = ({ setLoginStatus, setUser, loginStatus, passwordVisibility, setPasswordVisibility, changePasswordVisibility, userShows, setUserShows }) => {
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
      navigate('/', { replace: true })
    })
    .catch((e) => {
      console.log(e.response.data)
    })
  }
  return(
    <>
      <div className='loginForm'>
        <h1>Log In</h1>
        <form onSubmit={loginUser} method='POST' action='/login'>
          <div className='field'>
            <label htmlFor='email'>Email</label>
            <input type ='text' name='email' />
          </div>
          <div className='field'>
            <label htmlFor='password'>Password</label>
            {/* <div className='password-container'> */}
            <input type = {`${!passwordVisibility ? 'password' : 'text'}`} name='password'  autoComplete='off' />
            <div className='visibility-container'>
              <i className={`fas fa-eye${!passwordVisibility ? '-slash' : ''}`} onClick={changePasswordVisibility}></i>
            </div>
            {/* </div> */} 
          </div>
          {/* <p onClick={resetPassword}>Forgot password?</p> */}
          {/* <input type="hidden" name="_token" value="{{ csrf_token() }}" /> */}
          <input type='submit' value='Login' />
        </form>
      </div>
    </>
  )
}

export default LoginForm;