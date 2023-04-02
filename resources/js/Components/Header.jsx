import { useEffect } from "react"
import { BrowserRouter } from "react-router-dom"

import LogoutForm from "./LogoutForm"

const Header = ({ resetSlider, loginStatus, Link, LogoutForm, setEmail, setUser, setLoginStatus }) => {

  return (
    <div className='navbar'>
      <ul>
        <li><Link to='/' onClick={resetSlider}>Home</Link></li>
        <li>{loginStatus && <Link to='/my-series' onClick={resetSlider}>My Series</Link> }</li>
        <li>{loginStatus && <Link to='/my-movies' onClick={resetSlider}>My Movies</Link>}</li>
        <li>{loginStatus && <LogoutForm setEmail={setEmail} setUser={setUser} setLoginStatus={setLoginStatus} resetSlider={resetSlider} />}</li> 
        <li>{!loginStatus && <Link to='/login' onClick={resetSlider}>Login</Link>}</li>
        <li>{!loginStatus && <Link to='/register' onClick={resetSlider}>Register</Link>}</li>
      </ul>
    </div>
  )
}

export default Header
