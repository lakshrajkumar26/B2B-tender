import React from 'react';
import './Login.css'; // Import the CSS file
import {useState} from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const Login = () => {
 const [email ,setEmail] = useState('');
 const [password , setPassword] = useState('');
 const [isLogin ,setIsLogin] = useState(false);

const handleSubmit = async(e)=>{
   e.preventDefault();
  try{
    console.log(email , password)
  const res = await axios.post("http://localhost:3000/user/login",{
    email : email,
    password: password,
  },{ withCredentials: true });
  
  console.log( "Login response",res.data)
    if(res.status == 200){
      // nagivate(/home);
      setIsLogin(true);
      console.log("user login", isLogin);
    }
  }
  catch(err){
    console.log(err ,"error occurred in sending data to backend")
  }
  
}
  return (
    <div className="login-container">
      <div className="login-card">
        <h2 className="login-title">Welcome Back</h2>
        <form className="login-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Email Address</label>
            <input type="email" placeholder="Enter your email" onChange={(e)=> setEmail(e.target.value)} required />
          </div>
          <div className="form-group">
            <label>Password</label>
            <input type="password" placeholder="Enter your password" onChange={(e) => setPassword(e.target.value)}  required />
          </div>
          <div className="forgot-password">Forgot Password?</div>
          <button type="submit"  className="login-button">Login</button>
          <div className="signup-text">
            Don’t have an account? <span><Link to='/register'>Sign Up</Link></span> 
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
