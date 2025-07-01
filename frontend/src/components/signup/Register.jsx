import React, { useState } from 'react';
import './Register.css'; // Import the CSS
import axios from "axios";
import { Link } from 'react-router-dom';

const Register = () => {

  const [username , setUsername] = useState('');
  const [email , setEmail] = useState('');
  const [password , setPassword] = useState('');
 
  const handleSumbit = async(e)=>{
    e.preventDefault();
    try{
      const res = await axios.post("http://localhost:3000/user/register", {
        username : username,
        email ,
        password ,

      }, {withCredentials : true});
      console.log(res.data)
    }
    catch(err){
      console.log(err);
    }
    


  }

  return (
    <div className="register-container">
      <div className="register-card">
        <h2 className="register-title">Create Your Account</h2>
        <form className="register-form" onSubmit={handleSumbit}>
          <div className="form-group">
            <label>UserName</label>
            <input type="text" placeholder="Enter your full name" required onChange={(e)=>setUsername(e.target.value)} />
          </div>
          <div className="form-group">
            <label>Email Address</label>
            <input type="email" placeholder="Enter your email" required onChange={(e)=>setEmail(e.target.value)} />
          </div>
          <div className="form-group">
            <label>Password</label>
            <input type="password" placeholder="Create a password" required  onChange={(e)=>setPassword(e.target.value)} />
          </div>
          <div className="form-group">
            {/* <label>Confirm Password</label>
            <input type="password" placeholder="Confirm your password" required /> */}
          </div>
          <button type="submit" className="register-button">Register</button>
          <div className="login-text">
            Already have an account? <span><Link to='/login'>Login</Link></span> 
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
