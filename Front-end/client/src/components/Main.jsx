import {React, useEffect} from 'react';
import { useState } from 'react';
import axios from 'axios';

export default function Main() {

  const [data,setData] =useState([])
 
  useEffect(()=>{
    axios.get('http://localhost:7777/routes/Getdata')
    .then((user)=>{setData(user.data);
    console.log(user.data)})
    .catch((error)=>{console.log(error)})
  },[])


  
  return (
    <div>
      {
      data.map(user=>{
        return <div>{user.Name}</div>
      })
      }
    </div>
  ) 
}
