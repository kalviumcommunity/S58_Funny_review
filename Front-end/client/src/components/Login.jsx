import React, { useState } from 'react';
import {useEffect} from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
// import {useHistory} from 'react-router-dom'

export default function Login() {

  // const history = useHistory();

  const [signInfo, setSignInfo]= useState({
    username:"",
    password:""
  })
  const [logInfo, setLogInfo]= useState({
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

  
  const handleSignUpChange=(e,field)=>{
    e.preventDefault(); 
    if (field=="username"){
      setSignInfo({...signInfo,username:e.target.value})
    }
    else{
      setSignInfo({...signInfo, password : e.target.value})
    }
  }
  
  const handleLogInChange=(e,field)=>{
    e.preventDefault(); 
    if (field=="username"){
      setLogInfo({...logInfo,username:e.target.value})
    }
    else{
      setLogInfo({...logInfo, password : e.target.value})
    }
   
  }

  const handleSignUpSubmit=(e)=>{
    e.preventDefault(); 
    axios.post('http://localhost:7777/signUp/', signInfo)
    .then((response) => {
        console.log(response.data);
    })
    .catch((error) => {
        console.log(error);
    });
  }

  const handleLogInSubmit=(e)=>{
    e.preventDefault(); 
    axios.post('http://localhost:7777/logIn/', logInfo)
    .then((response) => {
        Cookies.set('token', response.data
      );
        console.log(response.data)
    })
    .catch((error) => {
        console.log(error);
    });
  } 


  

  return (
    <>
      <div>
        <form action="" onSubmit={(e)=>handleSignUpSubmit(e)}>
          <label> Enter your UserName <br />
            <input onChange={(e)=>handleSignUpChange(e,"username")} name='username' type="text" placeholder='UserName'/>
          </label><br></br>
          <label htmlFor="">Create your password <br />
            <input onChange={(e)=>handleSignUpChange(e,"password")} type="password" placeholder='Password' />
          </label><br></br>
          <label htmlFor="">Confirm your password <br />
            <input type="password" placeholder='Repeat password'/>
          </label>
          <br />
          <button type='submit' >SIGNUP</button>
        </form>    
      </div>
      <div>
      <form action="" onSubmit={(e)=>handleLogInSubmit(e)}>
          <label> Enter your UserName <br />
            <input onChange={(e)=>handleLogInChange(e,"username")} name='username' type="text" placeholder='UserName'/>
          </label><br></br>
          <label htmlFor="">Enter your password <br />
            <input onChange={(e)=>handleLogInChange(e,"password")} type="password" placeholder='Password' />
          </label><br></br>
          <button type='submit' >LOGIN</button>
        </form> 

      </div>
    </>
   
  )
}
