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
      Cookies.remove('password');
  } catch (error) {
      console.error("Error while logging out:", error);
  }
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
    </div>
  );
}
