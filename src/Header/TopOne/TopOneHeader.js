import React, { useEffect, useState } from "react";
import "../header.css"
import { FaLocationDot } from "react-icons/fa6";
import { AiOutlineSearch } from "react-icons/ai";
import { NavLink, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

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
              const response = await fetch("http://localhost:5008/api/finduser", {
                headers: {
                  Authorization: `Bearer ${token}`,
                },
              });
    
              if (response.ok) {
                const user = await response.json();
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
    
    return(
        <>
            <div className="allheader">
                <div className="toponeH">
                    <div className="logo"></div>
                    <div className="address"> <FaLocationDot />{userData && userData.length > 0 ? userData[0].address.substring(0, 20) : "this is your address"}......</div>
                    <div className="searchbar">
                        <input className="searchinput" placeholder="Find Your Item..............." />
                        <button className="searchbtn"><AiOutlineSearch /></button>
                    </div>

                    <div className="info info1 dropdown" onMouseEnter={handleDropdownToggle} onMouseLeave={handleDropdownToggle}>
                    <NavLink className="NavLink" style={({isActive}) => ({color : isActive ? "lightgreen" : "aliceblue"})}>{userData && userData.length > 0 ? userData[0].name.split(' ')[0]  : "Profile"}</NavLink>
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