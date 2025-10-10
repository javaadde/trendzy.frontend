import React from 'react'
import { useState,useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from './axios';
import showNotification from './notification.mjs';


export const ProtectedIfNotLogined = ({children}) => {
 
  const [isLogined, setIsLogined] = useState();
  const [role, setRole] = useState();
  const navigate = useNavigate()

  useEffect( () => {
    async function check() {

        try {
          const res = await axios.get("/", { withCredentials: true });
          setIsLogined(res.data.is);
          setRole(res.data.role);
        } catch (error) {
          console.log(error);
        }
    }

    check()

  },[])

  if(!isLogined){
    showNotification("you have to signUp first")
    navigate("/signUp");
    return
  }
  else{
    return children
  }

}
