import ShowUser from './ShowUser'
import ShowGuest from './ShowGuest'

const Greeting = ({ loginStatus, name }) => {
  return(
    <h1>Hello, {name}</h1>
  )
}

export default Greeting
