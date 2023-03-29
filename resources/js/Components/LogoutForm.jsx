import axios from "axios";

import { useNavigate } from 'react-router-dom'

const LogoutForm = ({ setName, setEmail, setUser, setLoginStatus, resetSlider }) => {
  const navigate = useNavigate();

  const logout = async (e) => {
    e.preventDefault()
    axios.post('/logout')
    setUser()
    navigate('/')
  }
  return (
    <form method='POST' action='/logout' onClick={resetSlider} onSubmit={logout}>
      <input type='submit' value='Log Out' />
    </form>
  )
}

export default LogoutForm
