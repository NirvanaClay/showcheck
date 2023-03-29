const Dashboard = ({ name, email }) => {
  return (
    <div>
      <h1>Hello, {name}. You are logged in.</h1>
      <h2>Your email address is {email}</h2>
    </div>
  )
}

export default Dashboard
