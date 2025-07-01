import React from 'react';
import './Navbar.css';
import { Link } from 'react-router-dom';
import Logout from './Logout/Logout';

const Navbar = () => {
  return (
    <nav>
      {/* Logo */}
      <div className="navbar-logo">
        HiTechX
      </div>

      
      <div className="nav-links">
        <Link to='/home'>Home</Link>
        <Link to="/protected">protected Route</Link>
        <a href="#products">Products</a>
        <a href="#about">About</a>
        <a href="#careers">Careers</a>
      </div>

     
      <Link to='/login' className="nav-cta">
        Login
      </Link>
      <Link to ='/register' className="nav-cta">
       Register
      </Link>
      

         <Logout>Logout</Logout>
     
    </nav>
  );
};

export default Navbar;
