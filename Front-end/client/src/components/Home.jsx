import {React, useEffect} from 'react';
import { useState } from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom'

export default function Main() {

  const [data,setData] =useState([])
 
  useEffect(()=>{
    axios.get('http://localhost:7777/restaurant/')
    .then((user)=>{setData(user.data);
    console.log(user.data)})
    .catch((error)=>{console.log(error)})
  },[])


  const handleDelete=(id)=>{
    axios.delete(`http://localhost:7777/restaurant/${id}`)
    .then((user)=>{
    console.log(user.data)})
    .catch((error)=>{console.log(error)})
    setData(data.filter(restaurant => {
      return restaurant._id !== id
    }))
  }
  
  return (
    <div>
      <table style={{border:"2px solid black"}}>
        <tbody>
        <tr >
          <th style={{border:"2px solid black"}}>Restaurant name</th>
          <th style={{border:"2px solid black"}}>Rating</th>
          <th style={{border:"2px solid black"}}>Location</th>
        </tr>
      {
      data.map(restaurant=>{
        return <tr key={restaurant._id} style={{border:"2px solid black"}}>
          <td style={{border:"2px solid black"}}>{restaurant.Name}</td>
          <td style={{border:"2px solid black"}}>{restaurant.Ratings}</td>
          <td style={{border:"2px solid black"}}>{restaurant.Location}</td>
       
          <td><Link to={`/restaurant/${restaurant._id}`}><button>View</button></Link></td>
          <td><button onClick={() => {handleDelete(restaurant._id)}} style={{backgroundColor:"red",color:"white"}}>DELETE</button></td>
          </tr>
      })
      }
      </tbody>
      </table>
    </div>
  )  
}
