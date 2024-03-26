import React, { useState } from 'react';
import {useEffect} from 'react';
import axios from 'axios';

export default function Login() {

  const [signInfo, setSignInfo]= useState({
    username:"",
    password:""
  })

  const [data,setData]= useState([])

  useEffect(()=>{
    axios.get('http://localhost:7777/user/')
    .then((user)=>{setData(user.data);
    console.log(user.data)})
    .catch((error)=>{console.log(error)})
  },[])

  
  const handleChange=(e,field)=>{
    e.preventDefault(); 
    if (field=="username"){
      setSignInfo({...signInfo,username:e.target.value})
    }
    else{
      setSignInfo({...signInfo, password : e.target.value})
    }
  }
  

  const handleSubmit=(e)=>{
    e.preventDefault(); 
    axios.post('http://localhost:7777/signUp/', signInfo)
    .then((response) => {
        console.log(response.data);
    })
    .catch((error) => {
        console.log(error);
    });
  }

  return (
    <>
        <form action="" onSubmit={(e)=>handleSubmit(e)}>
        <label> Enter your UserName <br />
          <input onChange={(e)=>handleChange(e,"username")} name='username' type="text" placeholder='UserName'/>
        </label><br></br>
        <label htmlFor="">Enter your password <br />
          <input onChange={(e)=>handleChange(e,"password")} type="password" placeholder='Password' />
        </label><br></br>
        <label htmlFor="">Confirm your password <br />
          <input type="password" placeholder='Repeat password'/>
        </label>
        <br />
        <button type='submit' >SIGNUP</button>
      </form>    
    </>
   
  )
}
