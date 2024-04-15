import { React, useEffect } from "react";
import { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Cookies from 'js-cookie';


export default function Main() {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [location, setLocation] = useState("");
  const [user,setUser]=useState("")
  const [addNew , setAddNew] = useState(false);
  const [submitted,setSubmit]=useState(false);
  const [userData, setUserData]= useState([])
  const [field, setField]= useState({
    Name:"",
    img_url:"",
    Location:"",
    Ratings:"",
    Review:"",
    Created_by:""
})
  
  const [userdisplay,setUserDisplay]=useState(false)
  useEffect(()=>{
    axios.get('http://localhost:7777/user/')
    .then((user)=>{setUserData(user.data);
    console.log(user.data)})
    .catch((error)=>{console.log(error)})
  },[])

  useEffect(() => {
    axios
      .get("http://localhost:7777/restaurant/")
      .then((user) => {
        setData(user.data);
        console.log(user.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const handleDelete = (id) => {
    axios
      .delete(`http://localhost:7777/restaurant/${id}`)
      .then((user) => {
        console.log(user.data);
      })
      .catch((error) => {
        console.log(error);
      });
    setData(
      data.filter((restaurant) => {
        return restaurant._id !== id;
      })
    );
  };

  const handleLocation = () => {
    if(location === ""){
      setFilteredData(data)
    }
    else{
      setFilteredData(
        data.filter((restaurant) => {
          return restaurant.Location === location;
        })
      );
    }
  };

  useEffect(() => {
    handleLocation();
  }, [location]);

  const handleLogout=(e)=>{
    try {
      Cookies.remove('username');
  } catch (error) {
      console.error("Error while logging out:", error);
  }
  }
  const handleAdd=()=>{
    console.log("Adding data");
    setAddNew(true);
  }

  const handleSubmit = () => {
    setField({...field,Created_by:"Khushi"})
    setField({...field,Location:location})
    
    axios
      .post(`http://localhost:7777/Addrestaurant/`, {field})
      .then((res) => {
        setData(res.data);
        setField([]);
        setSubmit(true)
        
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleUserReview=()=>{
    console.log("Working")
    setUserDisplay(true)
  }



  return (
    <div>
      <div>
       <button onClick={handleLogout}>LogOut</button>
        <FormControl style={{width: '300px'}}>
          <InputLabel id="simple-select-label">Location</InputLabel>
          <Select
            labelId="simple-select-label"
            id="simple-select"
            value={location}
            label="Location"
            onChange={(e) => {
              setLocation(e.target.value);
            }}
            autoWidth
          >
            <MenuItem value={"Jaipur"}>Jaipur</MenuItem>
            <MenuItem value={"Punjab"}>Punjab</MenuItem>
            <MenuItem value={"Chandigarh"}>Chandigarh</MenuItem>
            <MenuItem value={"Delhi"}>Delhi</MenuItem>
          </Select>
        </FormControl>
      </div>
      <button onClick={handleUserReview}>
        All reviews by Users
      </button>
      <div>
        <h1>Filter restro by user</h1>
      </div>
      <table style={{ border: "2px solid black" }}>
        <tbody>
          <tr>
            <th style={{ border: "2px solid black" }}>Restaurant name</th>
            <th style={{ border: "2px solid black" }}>Rating</th>
            <th style={{ border: "2px solid black" }}>Location</th>
          </tr>
          {filteredData.map((restaurant) => {
            return (
              <tr key={restaurant._id} style={{ border: "2px solid black" }}>
                <td style={{ border: "2px solid black" }}>{restaurant.Name}</td>
                <td style={{ border: "2px solid black" }}>
                  {restaurant.Ratings}
                </td>
                <td style={{ border: "2px solid black" }}>
                  {restaurant.Location}
                </td>

                <td>
                  <Link to={`/restaurant/${restaurant._id}`}>
                    <button>View</button>
                  </Link>
                </td>
                <td>
                  <button
                    onClick={() => {
                      handleDelete(restaurant._id);
                    }}
                    style={{ backgroundColor: "red", color: "white" }}
                  >
                    DELETE
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      
      <button onClick={()=>handleAdd()}>+</button>
      {addNew ? (
        <div className="addBox">
          <h1>lets add new restroooo</h1>
          <form action='' onSubmit={handleSubmit}>
            <div className='box'>        
                
                <input 
                    value={field.Name} type="text" placeholder='Enter new Name' onChange={(e)=>setField({...field,Name:e.target.value})}
                />
                {submitted==true && field.Name==""?<p>Enter new Restaurant Name</p>:null}
                
                {submitted==true && field.Location==""?<p>Enter new Restaurant Name</p>:null}
                <input 
                    value={field.Ratings} type="text" placeholder='Rate the restaurant' onChange={(e)=>setField({...field,Ratings:e.target.value})}
                />
                {submitted==true && field.Ratings==""?<p>Enter New Restaurant Ratings</p>:null}
                <input 
                    value={field.Review} type="text" placeholder='Post a funny Review' onChange={(e)=>setField({...field,Review:e.target.value})}
                />

                {submitted==true && field.Review==""?<p>Enter your Reviews.</p>:null}


                    <div className='submit-bn'>
                        <button type='submit'>submit</button>
                    </div>
                
            </div>
        </form>
        </div>
        ) : ( 
          <div></div>
        )}

    { <FormControl style={{width: '300px'}}>
              <InputLabel id="simple-select-label">Users</InputLabel>
              <Select
                labelId="simple-select-label"
                id="simple-select"
            
                label="Users"
                onChange={(e) => {
                  setLocation(e.target.value);
                }}
                autoWidth
              >
                <MenuItem value={"Jaipur"}>Jaipur</MenuItem>
               
              </Select>
            </FormControl> }




       {userdisplay ? (console.log("yes")):(console.log("no"))}
   

    </div>
    
  );
}
