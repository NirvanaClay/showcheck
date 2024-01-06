import axios from "../axiosConfig";

import { useNavigate } from 'react-router-dom'

const LogoutForm = ({ setEmail, setUser, setLoginStatus, resetSlider }) => {
  const navigate = useNavigate();

  const logout = (e) => {
    e.preventDefault()
    axios.post('/logout')
    .then(() => {
      setUser()
      setLoginStatus(false)
      navigate('/')
    })
  }
  return (
    <form onClick={resetSlider} onSubmit={logout}>
      <input type='submit' value='Log Out' />
    </form>
  )
}

export default LogoutForm
