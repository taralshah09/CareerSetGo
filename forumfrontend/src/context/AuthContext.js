import {createContext, useState, useEffect} from 'react'
import jwt_decode from 'jwt-decode'
import { useNavigate } from 'react-router-dom'

const AuthContext = createContext()

export default AuthContext;

export const AuthProvider = ({children}) => {
  // Check existence of authToken in browser storage
  let token = localStorage.getItem('access_token');
  let userState = token ? jwt_decode(token) : null;

  const [user, setUser] = useState(userState);
  const [access_token, setAccessToken] = useState(token || null);
  const navigate = useNavigate();

  let loginUser = async (e) => {
    e.preventDefault();
    const credentials = new FormData(e.currentTarget);
    const data = {
        email: credentials.get('email'),
        password: credentials.get('password'),
    };

    const response = await fetch('http://127.0.0.1:8000/api/token/', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(data),
    });

    const responseData = await response.json();

    if (response.status === 200) {
        setAccessToken(responseData.access);
        setUser(jwt_decode(responseData.access));
        localStorage.setItem('access_token', responseData.access);
        navigate('/');
    } else {
        alert('Something went wrong!');
    }
  }

  let logoutUser = () => {
      setAccessToken(null);
      setUser(null);
      localStorage.removeItem('access_token');
      navigate('/');
  }

  let registerUser = async (e) => {
      e.preventDefault();
      const credentials = new FormData(e.currentTarget);

      const response = await fetch("/api/register/", {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({
          'username': credentials.get('username'),
          'fullname': credentials.get('fullname'),
          'email': credentials.get('email'),
          'password': credentials.get('password'),
          'password2': credentials.get('password2'),
        })
      });

      if (response.status === 201) {
        navigate('/login');
      } else {
        alert("Something went wrong!");
      }
  };

  let contextData = {
      user,
      loginUser,
      logoutUser,
      registerUser
  }

  return (
      <AuthContext.Provider value={contextData}>
          {children}
      </AuthContext.Provider>
  );
};
