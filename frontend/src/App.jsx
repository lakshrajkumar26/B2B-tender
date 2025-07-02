import { useState } from 'react'
import './App.css'
import Login from './components/login/Login'
import Register from './components/signup/Register'
import Protected from './components/Protected'
import HomePage from './components/Pages/HomePage'
import { Routes, Route, } from 'react-router-dom'
import Navbar from './components/Navbar'
import Logout from './components/Logout/Logout'
import CompanyProfile from './components/Pages/CompanyProfile'
import CompanyDetails from './components/Pages/CompanyDetails'
import CreateCompany from './components/Pages/CreateCompany'
import TenderList from './components/Pages/TenderList'


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
        <Route path='/company' element={<CompanyProfile />} />
        <Route path="/company/:id" element={<CompanyDetails />} />
        <Route path="/company/register" element={<CreateCompany />} />
        <Route path="/tender" element={<TenderList />} />
      </Routes>
    </>
  )
}

export default App
