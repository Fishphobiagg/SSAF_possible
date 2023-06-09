import { createContext, useState, useEffect } from "react";
import jwt_decode from "jwt-decode";
import {useNavigate} from 'react-router-dom';

const AuthContext = createContext()

export default AuthContext;

export const AuthProvider = ({ children }) => {
  
   
  const [authTokens, setAuthTokens] = useState(()=> localStorage.getItem('authTokens') ? JSON.parse(localStorage.getItem('authTokens')) : null)
  const [user, setUser] = useState(()=> localStorage.getItem('authTokens') ? jwt_decode(localStorage.getItem('authTokens')) : null);

  const Navigate = useNavigate();

  let loginUser = async (e) => {
    e.preventDefault();
    let response = await fetch('http://127.0.0.1:8000/account/token',{
      method:'POST',
      headers:{
        'Content-Type':'application/json'
      },
      body:JSON.stringify({'username':e.target.username.value, 'password':e.target.password.value})
    })
    let data = await response.json()

    if(response.status === 200){
      setAuthTokens(data)
      setUser(jwt_decode(data.access))
      localStorage.setItem('authTokens', JSON.stringify(data))
      Navigate('/article')
    }
    else{
      alert('Somthing went wrong')
    }
  };
  let logoutUser = ()=>{
    setAuthTokens(null)
    setUser(null)
    localStorage.removeItem('authTokens')
    Navigate('/login')
  };

  const updateToken = async () => {
    let response = await fetch('http://127.0.0.1:8000/account/token',{
      method:'POST',
      headers:{
        'Content-Type':'application/json'
      },
      body:JSON.stringify({'refresh':authTokens.refresh})
    })
    let data = await response.json()

    if(resoponse.status===200){
      setUser(jwt_decode(data.access))
      localStorage.setItem('authTokens', JSON.stringify(data))
      Navigate('/article')
    }
  }

  const contextData = {
    user:user,
    loginUser: loginUser,
    logoutUser: logoutUser,
  };

  return (
    <AuthContext.Provider value={contextData}>
      {children}
    </AuthContext.Provider>
  );
};
