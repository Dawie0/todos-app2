import { useState } from 'react'
import './App.css'
import MainWindow from './components/MainWindow'
import Login from './components/Login'

function App() {
  const [loggedIn, setLoggedIn] = useState(false)

  const login = () => {
    setLoggedIn(true)
  }

  return (
    <div>
      {loggedIn ? <MainWindow /> : <Login handleLogin={() => login()} />}
    </div>
  )
}

export default App

