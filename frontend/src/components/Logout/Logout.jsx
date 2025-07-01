import React, { useEffect, useState } from 'react'
import './Logout.css'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


const Logout = ({ children }) => {
    const navigate = useNavigate();
    const [isLogin, setIsLogin] = useState(false);

    //Check localStorage token on component mount

      useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await axios.get('http://localhost:3000/is-authenticated', {
          withCredentials: true, // ✅ includes HTTP-only cookie
        });


        if (res.data.authenticated) {
          setIsLogin(true);
        } else {
          setIsLogin(false);
        }
      } catch (err) {
        setIsLogin(false); // token missing or invalid
      }
    };

    checkAuth();
  }, []);


    // useEffect(() => {

    //     const token = localStorage.getItem('token');
    //     if (token) {
    //         setIsLogin(true);
    //     } else {
    //         setIsLogin(false);
    //     }
    // }, [])


   

    const handleLogout = async () => {
        try {
            const res = await axios.post('http://localhost:3000/user/logout', {}, {
                withCredentials: true,
            });

            // localStorage.removeItem("token");
            setIsLogin(false);

            navigate("/login");
            alert(res.data.msg);

        }
        catch (err) {
            console.log(err);
            alert("Logout failed");
        }
    }



    return (
        <>
            {  <button className="logout-btn" onClick={handleLogout}>{children}</button>}
        </>
    )
}

export default Logout