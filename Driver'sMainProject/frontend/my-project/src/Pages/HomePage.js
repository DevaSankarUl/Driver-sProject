import React, { useEffect } from 'react' 
import Home from '../component/Home'
import Navbar from '../component/Navbar/UserNavbar'
import Foot from '../component/Footer/footer'
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { userLoginDetails } from '../component/Redux/adminReducer';
import jwt from 'jwt-decode';
function HomePage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  useEffect(() => {
    const token = localStorage.getItem('token');
  
    if (token) {
      const user = jwt(token);
      console.log(user,'red use');
      dispatch(userLoginDetails(user));
      if (user) {
        navigate('/');
      } else {
        navigate('/login');
      }
    } else {
      navigate('/login');
    }
  }, [navigate, dispatch]);
  return (
    <div>
      <Navbar/>
      <Home/>
      <Foot/>
      </div>
  )
}
export default HomePage

