import { useEffect, useState } from 'react'
import { Navigate, useNavigate } from 'react-router-dom'

import axios from 'axios'

const LoginForm = ({ setLoginStatus, setUser, loginStatus, passwordVisibility, setPasswordVisibility, changePasswordVisibility, userShows, setUserShows }) => {
  const navigate = useNavigate()

  useEffect(() => {
    console.log("In loginForm, loginStatus is:")
    console.log(loginStatus)
    console.log("and in loginForm, userShows are:")
    console.log(userShows)
  }, [userShows])

  function getCookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift()
  }
  
  const loginUser = async (e) => {
    e.preventDefault();
    const theAxios = axios.create({
      baseURL: process.env.NODE_ENV === 'production' ? 'https://showcheck.herokuapp.com' : '',
      // baseURL: 'http://localhost',
      // withCredentials: true
    });
    let data = {
      email: e.target[0].value,
      password: e.target[1].value
    }
    theAxios.get('sanctum/csrf-cookie')
      .then((res) => {
        const xsrfToken = getCookie('XSRF-TOKEN')
        theAxios.post('login', data, {
          headers: {
            'X-XSRF-TOKEN': xsrfToken
          }
        })
          .then((res) => {
            theAxios.get('api/userShows')
          })
      })
  //   const theAxios = axios.create({
  //     baseURL: 'http://localhost:8888',
  //     // headers: {
  //     //     // 'X-Requested-With': 'XMLHttpRequest',
  //     //     // 'Accept': 'application/json',
  //     //     // 'credentials': 'include'
  //     //     'X-XSRF-TOKEN': getCookieValue('XSRF-TOKEN')
  //     // },
  //     // withCredentials: true,
  // })
    // let data = {
    //   email: e.target[0].value,
    //   password: e.target[1].value
    // }
    // theAxios.get('sanctum/csrf-cookie')
    // .then((res) => {
    //   // theAxios.get('testing')
    //   theAxios.post('login', data)
    //   // axios.get('http://localhost:8888/login')
    //   .then((res) => {
    //     theAxios.get('api/userShows')
    //   })
    // })
    //   axios.post('/login', data)
    //   .then((res) => {
    //     axios.get('/user')
    //   })
    // })
    // axios.post(`/login`, data)
    // .then((res) => {
    //   axios.post('/tokens/create')
    //   .then((res) => {
    //     axios.get('/userShows', res.data)
    //   })
    // })
    // axios.post('/api/auth/login', data)
    // .then(() => {
    //   axios.post('/tokens/create')
    // })
    // .then((res) => {
    //   const user = res.data
    //   setUser(user)
    //   // setName(user.name)
    //   // setEmail(user.email)
    //   // setUserId(user.id)
    //   setLoginStatus(true)
    //   axios.get('/userShows')
    //   .then((res) => {
    //     setUserShows([...res.data])
    //     // let userShows = res.data
    //     // console.log("userShows are:")
    //     // console.log(userShows)
    //     // let userSeries = userShows.filter(show => show.show_type == 'series')
    //     // let userMovies = userShows.filter(show => show.show_type == 'movie')
    //     // let orderedUserSeries = userSeries.sort((a, b) => a.title.localeCompare(b.title))
    //     // let orderedUserMovies = userMovies.sort((a, b) => a.title.localeCompare(b.title))
    //     // console.log("orderedUserSeries is:")
    //     // console.log(orderedUserSeries)
    //     // console.log("orderedUserMovies are:")
    //     // console.log(orderedUserMovies)
    //     // getSeries([...orderedUserSeries])
    //     // getMovies([...orderedUserMovies])
    //   })
    //   // .then((res) => {
    //   //   let shows = res.data;
    //   //   for(let show of shows){

    //   //   }
    //   //   console.log("The response from userShows is:")
    //   //   console.log(res)
    //   // })
    //   // const userInfo = res.data
    //   // console.log("In login form, userInfo is:")
    //   // console.log(userInfo)
    //   // setUser(userInfo)
    //   // setLoginStatus(true)
    // })
    // //   })
    // // navigate('/')
  }

  useEffect(() => {
    console.log("Password visibility is:")
    console.log(passwordVisibility)
  }, [passwordVisibility])

  // const resetPassword = () => {
  //   axios.get('/passwordReset')
  //   .then((res) =>{
  //     console.log("In resetPassword, res is:")
  //     console.log(res)
  //   })
  // }

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