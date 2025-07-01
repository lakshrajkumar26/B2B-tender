import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Login from './components/login/Login'
import Register from './components/signup/Register'
import Protected from './components/Protected'
import HomePage from './components/Pages/HomePage'
import { Routes, Route, } from 'react-router-dom'
import Navbar from './components/Navbar'
import Logout from './components/Logout/Logout'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Navbar />
      <Routes>
        <Route path='/register' element={<Register />} />
        <Route path='/login' element={<Login />} />
        <Route path='/home' element={<HomePage />} />
        <Route path='/protected' element={<Protected />} />
        <Route path='/logout' element={<Logout />} />
      </Routes>
    </>
  )
}

export default App
