import React, { useEffect, useState } from "react";
import "../header.css"
import { FaLocationDot } from "react-icons/fa6";
import { AiOutlineSearch } from "react-icons/ai";
import { NavLink, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import axios from "axios";

function TopOneHeader(){

    const [isDropdownVisible, setDropdownVisible] = useState(false);
    const [userData, setUserData] = useState(null);
    
    const handleDropdownToggle = () => {
        setDropdownVisible(!isDropdownVisible);
    };

    const totalItems = useSelector((state) => state.cart.items.reduce((total, item) => total + item.quantity, 0)) || 0;
    
    const nav = useNavigate();
    const handelLogout = () => {
        localStorage.removeItem("token")
        nav('/login')
        window.location.reload(true)
    }

    useEffect(() => {
        const fetchUserData = async () => {
          const token = localStorage.getItem("token");
    
          if (token) {
            try {
              const response = await fetch("https://ecommerce-project-8m5d.onrender.com/api/finduser", {
                // const response = await fetch("http://localhost:5008/api/finduser", {
                headers: {
                  Authorization: `Bearer ${token}`,
                },
              });
    
              if (response.ok) {
                const user = await response.json();
                console.log("Fetched user data:", user);
                
                if (user && user.name) {
                    setUserData(user);
                } else {
                    console.error("Invalid user data format");
                }
                setUserData(user);
              } else {
                // Handle error when fetching user data
                console.error("Failed to fetch user data");
              }
            } catch (error) {
              // Handle other errors
              console.error("Error fetching user data:", error);
            }
          }
        };
    
        fetchUserData();
      }, []);

    const [searchItem, setSearchItem] = useState("");
    const handleInput = (e) => {
        e.preventDefault();
        setSearchItem(e.target.value);
    }
    const handleSearch = async () => {
        try {
            // const response = await axios.get(`http://localhost:5008/api/search?searchItem=${searchItem}`);
            const response = await axios.get(`https://ecommerce-project-8m5d.onrender.com/api/search?searchItem=${searchItem}`);
            const searchData = response.data;
            console.log(response.data);
            console.log(searchData.length);
            if (searchData.length === 0) {
                alert("Results not found!");
                setSearchItem("");
                nav("/");
            }
            else {
                nav("/SearchItem", { state: { searchData, searchItem } });
                setSearchItem("");
            }
        }
        catch (err) {
            console.log("Error searching:", err);
        }
    }
    
    return(
        <>
            <div className="allheader">
                <div className="toponeH">
                    <div className="logo"></div>
                    <div className="address"> <FaLocationDot />{userData && userData.address ? userData.address.substring(0, 20) : "this is your address"}......</div>
                    <div className="searchbar">
                        <input className="searchinput" value={searchItem}  onChange={handleInput} placeholder="Find Your Item..............." />
                        <button className="searchbtn" onClick={handleSearch}><AiOutlineSearch /></button>
                    </div>

                    <div className="info info1 dropdown" onMouseEnter={handleDropdownToggle} onMouseLeave={handleDropdownToggle}>
                    <NavLink className="NavLink" style={({isActive}) => ({color : isActive ? "lightgreen" : "aliceblue"})}>{userData && userData.name ? userData.name.split(" ")[0] : "Profile"}</NavLink>
                        {isDropdownVisible && (
                            <div className="dropdown-content">
                            <ul>
                            {localStorage.getItem("token") ? (
                                <li><NavLink><button onClick={handelLogout} className="LogOutBTN">LogOut</button></NavLink></li>
                                )   : (<>
                                <li><NavLink to="/login">Login</NavLink></li>
                                <li><NavLink to="/register">Register</NavLink></li>
                                </>)
                            } 
                            </ul>
                            </div>
                        )}
                    </div>
                        <div className="cart cart1">
                        {localStorage.getItem("token") ? (
                            <NavLink className="CartLink" to="/Cart">        
                                    <h3>{totalItems}</h3>
                            </NavLink>) : 
                            (
                            <NavLink className="CartLink" to="/login">        
                                <h3>{totalItems}</h3>
                            </NavLink>
                            )
                        }    
                        </div>
                </div>
            </div>
        </>
    )
}

export default TopOneHeader;


