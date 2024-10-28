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
  const [filteredUser, setFilteredUser]= useState([])
  const [field, setField]= useState({
    Name:"",
    img_url:"",
    Location:"",
    Ratings:"",
    Review:"",
    Created_by:""
})
  
  
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

  const handleUserSelect = (event) => {
    const selectedUser = event.target.value;
    setUser(selectedUser);
    setFilteredData(
      data.filter((restaurant) => {
        return restaurant.Created_by === selectedUser;
      })
    );
  };
  



  return (
    <div>
      <header>

      
    <nav class="flex space-between align-center" >
            <div class="logo flex align-center">
                {/* <img src="./Images/Screenshot 2023-12-06 173323.png" alt=""> */}
                <div ><span>Fun</span> Food</div>
            </div>
            <div class="menu flex space-between">
              <div className=" buttons-sec flex">
                <div className="book-btn flex align-center">
                  City
                </div>
                <div className="audio-btn flex align-center">
                  Users
                </div>
              </div>     
            </div>
            <div class="number flex align-center space-between">
                <button className="register-btn">REGISTER</button>
                {/* <button onClick={handleLogout}>LogOut</button> */}
            </div>
        </nav>
        <h1>Turn Criticism into Comedy!</h1>
        <p>Spice dish up with funny reviews</p>
        <p>Post your own, or just enjoy the show!</p>
        <div className="drop-down">
       
        <FormControl  style={{width: '300px'}}>
          <InputLabel id="simple-select-label" sx={{ color: 'white' }} >Location</InputLabel>
          <Select
            labelId="simple-select-label"
            id="simple-select"
            value={location}
            label="Location"
            onChange={(e) => {
              setLocation( e.target.value);
            }}
            autoWidth 
            sx={{
              color: 'white', 
              '.MuiOutlinedInput-notchedOutline': {
                borderColor: 'white', 
              },
              '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                borderColor: 'white', 
              },
              '.MuiSvgIcon-root': {
                color: 'white', 
              }
            }}
          >
            <MenuItem value={"Jaipur"}>Jaipur</MenuItem>
            <MenuItem value={"Punjab"}>Punjab</MenuItem>
            <MenuItem value={"Chandigarh"}>Chandigarh</MenuItem>
            <MenuItem value={"Delhi"}>Delhi</MenuItem>
          </Select>
        </FormControl>
        {/* <FormControl style={{ width: '300px' }}>
          <InputLabel id="user-select-label" sx={{ color: 'white' }}>Users</InputLabel>
          <Select
            labelId="user-select-label"
            id="user-select"
            value={user}
            onChange={handleUserSelect}
            label="User"
            autoWidth
            sx={{
              color: 'white', 
              '.MuiOutlinedInput-notchedOutline': {
                borderColor: 'white', 
              },
              '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                borderColor: 'white', 
              },
              '.MuiSvgIcon-root': {
                color: 'white', 
              }
            }}
          >
          {userData.map((user) => (
            <MenuItem key={user._id} value={user.username}>
            {user.username}
            </MenuItem>
          ))}
          </Select>
        </FormControl> */}
      </div>
      </header>   
      <div className="border display-belt flex space-between">        
      { filteredData.map((restaurant) =>{
        return(
        <div>
        <img className="cimg border" src={restaurant.img_url} alt="" />
        <p className="title">{restaurant.Name}</p>
        {/* <span className="flex rating">
          <p>Rating: {restaurant.Ratings}</p>
        </span> */}
        <span className="flex space-between">
        <button className="delete-btn hover" onClick={() => {handleDelete(restaurant._id);}} >DELETE
        </button>
        <Link to={`/restaurant/${restaurant._id}`}>
          <button className="view-btn hover">View</button>
        </Link>
        </span>
        
      </div>)
   
      })} </div> 
      
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



            

            



       
   

    </div>
    
  );
}

