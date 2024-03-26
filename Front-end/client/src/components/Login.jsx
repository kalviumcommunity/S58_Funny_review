import React, { useState } from 'react';
import {useEffect} from 'react';
import axios from 'axios';

export default function Login() {

  const [logInfo, setLogInfo]= useState({
    username:"",
    password:""
  })

  const [data,setData]= useState([])

  useEffect(()=>{
    axios.get('http://localhost:7777/routes/getusers')
    .then((user)=>{setData(user.data);
    console.log(user.data)})
    .catch((error)=>{console.log(error)})
  },[])

  
  const handleChange=(e,field)=>{
    e.preventDefault(); 
    if (field=="username"){
      setLogInfo({...logInfo,username:e.target.value})
    }
    else{
      setLogInfo({...logInfo, password : e.target.value})
    }
  }
  

  const handleSubmit=(e)=>{
    e.preventDefault(); 
    axios.post('http://localhost:7777/routes/adduser', logInfo)
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
