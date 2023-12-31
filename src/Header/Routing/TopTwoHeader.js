import React,{ useEffect, useState } from "react";
import { NavLink, Route, Routes, useNavigate } from 'react-router-dom';
import Home from "../../Components/Home";
import Electronic from "../../Components/Electronic";
import Sports from "../../Components/Sports";
import Fitness from "../../Components/Fitness";
import Kitchen from "../../Components/Kitchen";
import Men from "../../Components/Men's";
import Women from "../../Components/Women's";
import Product from "../../Components/SeprateProduct/Product";
import Iphone from "../../SubComponents/Iphone";
import Samsung from "../../SubComponents/Samsung";
import Oneplus from "../../SubComponents/Oneplus";
import DataStore from "../../Store/DataStore";
import Mobile from "../../SubCategory/Mobile";
import Refrigrtor from "../../SubCategory/Refrigrtor";
import LG from "../../SubComponents/LG";
import Pegeon from "../../SubComponents/Pegeon";
import Cooker from "../../SubCategory/Cooker";
import Campus from "../../SubComponents/Campus";
import Manyavar from "../../SubComponents/Manyavar";
import Shoes from "../../SubCategory/Shoes";
import Kurta from "../../SubCategory/Kurta";
import TJsaree from "../../SubComponents/TJsaree";
import Fostelo from "../../SubComponents/Fostelo";
import Saree from "../../SubCategory/Saree";
import Handbag from "../../SubCategory/Handbag";
import LoginPage from "../../Profiles/LoginPage";
import RegisterPage from "../../Profiles/RegisterPage";
import Cart from "../../CartFile/Cart";
import { useSelector } from "react-redux";
import Apple from "../../SubComponents/Apple";
import Acer from "../../SubComponents/Acer";
import Laptop from "../../SubCategory/Laptop";
import Watch from "../../SubCategory/Watch";
import Noise from "../../SubComponents/Noise";
import Fastrack from "../../SubComponents/Fastrack";
import SearchItem from "../../Search/SearchItem";


function TopTwoHeader(){

    const [menuOpen, SetMenuOpen] = useState(false);

    const totalItems = useSelector((state) => state.cart.items.reduce((total, item) => total + item.quantity, 0)) || 0;

    const scrollToTop = () => {
        window.scrollTo({
          top: 0,
          behavior: "smooth", 
        });
        SetMenuOpen(false);
    };

    const [isDropdownVisible, setDropdownVisible] = useState(false);

    const handleDropdownToggle = () => {
        setDropdownVisible(!isDropdownVisible);
    };

    const [userData, setUserData] = useState(null);

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
     
    
    const nav = useNavigate();  
    const handelLogout = () => {
        localStorage.removeItem("token")
        nav('/login')
        window.location.reload(true)
    }

    return(
        <>
                <div className='menu' onClick={() => {
                        SetMenuOpen(!menuOpen);
                    }}>
                            <span></span>
                            <span></span>
                            <span></span>
                </div>

        <div id="close" className={menuOpen ? "open" : ""}>                
            <div className="top2header">
                    
                    <div className="cart formobile">
                        <NavLink onClick={scrollToTop} className="CartLink" to="/Cart">
                            <h3>{totalItems}</h3>
                        </NavLink>    
                    </div>
                    <div className="info formobile" onMouseEnter={handleDropdownToggle} onMouseLeave={handleDropdownToggle}>
                        <NavLink to="/login" onClick={scrollToTop} className="NavLink" style={({isActive}) => ({color : isActive ? "lightgray" : "aliceblue"})}>{userData && userData.name ? userData.name.split(" ")[0] : "Profile"}</NavLink>
                            <button className="LogOutBTN" onClick={handelLogout}>LogOut</button>
                            {isDropdownVisible && (
                                <div className="dropdown-content">
                                <ul>
                                    <li><NavLink to="/login">Login</NavLink></li>
                                    <li><NavLink to="/register">Register</NavLink></li>
                                </ul>
                                </div>
                            )}
                    </div>

                    <NavLink className="NavLink dropdown" onClick={scrollToTop} style={({isActive}) => ({color : isActive ? "lightgreen" : "aliceblue"})} to="/">Home</NavLink>

                    <div className="dropdown" onClick={scrollToTop} onMouseEnter={handleDropdownToggle} onMouseLeave={handleDropdownToggle}>
                        <NavLink className="NavLink" style={({isActive}) => ({color : isActive ? "lightgreen" : "aliceblue"})} to="/Electronic">Electronic</NavLink>
                        {isDropdownVisible && (
                            <div className="dropdown-content">
                            <ul>
                                <li><NavLink to="/Electronic/Mobile">Mobile's</NavLink></li>
                                <li><NavLink to="/Electronic/Laptop">Laptop's</NavLink></li>
                                <li><NavLink to="/Electronic/Watch">Watch's</NavLink></li>
                            </ul>
                            </div>
                        )}
                    </div>


                    {/* <div className="dropdown" onClick={scrollToTop} onMouseEnter={handleDropdownToggle} onMouseLeave={handleDropdownToggle}>
                    <NavLink className="NavLink" style={({isActive}) => ({color : isActive ? "lightgreen" : "aliceblue"})} to="/Sports">Sports</NavLink>
                    {isDropdownVisible && (
                        <div className="dropdown-content">
                        <ul>
                            <li><NavLink to="/Sports/Bat">Bat</NavLink></li>
                            <li><NavLink to="/Sports/Hockey">Hockey</NavLink></li>
                            <li><NavLink to="/Sports/Balls">Balls</NavLink></li>
                        </ul>
                        </div>
                    )}
                    </div> */}


                    {/* <div className="dropdown" onClick={scrollToTop} onMouseEnter={handleDropdownToggle} onMouseLeave={handleDropdownToggle}>
                    <NavLink className="NavLink" style={({isActive}) => ({color : isActive ? "lightgreen" : "aliceblue"})} to="/Fitness">Fitness</NavLink>
                    {isDropdownVisible && (
                        <div className="dropdown-content">
                        <ul>
                            <li><NavLink to="/Fitness/Yogamat">Yoga-mats</NavLink></li>
                            <li><NavLink to="/Fitness/Dumbbeles">Dumbbeles</NavLink></li>
                            <li><NavLink to="/Fitness/WeightMechine">Weight Meachine</NavLink></li>
                        </ul>
                        </div>
                    )}
                    </div> */}


                    <div className="dropdown" onClick={scrollToTop} onMouseEnter={handleDropdownToggle} onMouseLeave={handleDropdownToggle}>
                    <NavLink className="NavLink" style={({isActive}) => ({color : isActive ? "lightgreen" : "aliceblue"})} to="/Kitchen">Kitchen</NavLink>
                    {isDropdownVisible && (
                        <div className="dropdown-content">
                        <ul>
                            <li><NavLink to="/Kitchen/Refrigetors">Refrigetors</NavLink></li>
                            <li><NavLink to="/Kitchen/Cookers">Cookers</NavLink></li>
                            {/* <li><NavLink to="/Kitchen/Waterfltr">Water Filters</NavLink></li> */}
                        </ul>
                        </div>
                    )}
                    </div>


                    <div className="dropdown" onClick={scrollToTop} onMouseEnter={handleDropdownToggle} onMouseLeave={handleDropdownToggle}>
                    <NavLink className="NavLink" style={({isActive}) => ({color : isActive ? "lightgreen" : "aliceblue"})} to="/Men">Men's</NavLink>
                    {isDropdownVisible && (
                        <div className="dropdown-content">
                        <ul>
                            <li><NavLink to="/Mens/Kurta">Kurta</NavLink></li>
                            {/* <li><NavLink to="/Mens/Jacket">Jacket</NavLink></li> */}
                            <li><NavLink to="/Mens/Shoes">Shoes</NavLink></li>
                        </ul>
                        </div>
                    )}
                    </div>


                    <div className="dropdown" onClick={scrollToTop} onMouseEnter={handleDropdownToggle} onMouseLeave={handleDropdownToggle}>
                    <NavLink className="NavLink" style={({isActive}) => ({color : isActive ? "lightgreen" : "aliceblue"})} to="/Women">Women's</NavLink>
                    {isDropdownVisible && (
                        <div className="dropdown-content">
                        <ul>
                            <li><NavLink to="/Women/Saree">Sarees</NavLink></li>
                            {/* <li><NavLink to="/Women/Skincare">Skincare</NavLink></li> */}
                            <li><NavLink to="/Women/Handbag">Handbag</NavLink></li>
                        </ul>
                        </div>
                    )}
                    </div>
            </div>
        </div>    
            <div className="forresponsive">
                <DataStore>
                    <Routes>
                            <Route path="/" element={<Home />} />
                            <Route path="/Electronic" element={<Electronic />} />
                            <Route path="/Sports" element={<Sports />} />
                            <Route path="/Fitness" element={<Fitness />} />
                            <Route path="/Kitchen" element={<Kitchen />} />
                            <Route path="/Men" element={<Men />} />
                            <Route path="/Women" element={<Women />} />
                            <Route path="/Product/:id" element={<Product />} />


                            <Route path="/Electronic/Mobile" element={<Mobile />} />
                            <Route path="/Electronic/Laptop" element={<Laptop />} />
                            <Route path="/Electronic/Watch" element={<Watch />} />
                            <Route path="/Kitchen/Refrigetors" element={<Refrigrtor />} />
                            <Route path="/Kitchen/Cookers" element={<Cooker />} />
                            <Route path="/Mens/Shoes" element={<Shoes />} />
                            <Route path="/Mens/Kurta" element={<Kurta />} />
                            <Route path="/Women/Saree" element={<Saree />} />
                            <Route path="/Women/Handbag" element={<Handbag />} />
                            

                            <Route path="/Electronic/Mobile/Iphone" element={<Iphone />}/>
                            <Route path="/Electronic/Mobile/Samsung" element={<Samsung />}/>
                            <Route path="/Electronic/Mobile/Oneplus" element={<Oneplus />}/>
                            <Route path="/Electronic/Laptop/Apple" element={<Apple />}/>
                            <Route path="/Electronic/Laptop/Acer" element={<Acer />}/>
                            <Route path="/Electronic/Watch/Fastrack" element={<Fastrack />}/>
                            <Route path="/Electronic/Watch/Noise" element={<Noise />}/>
                            <Route path="/Ketchen/Refrigetor/LG" element={<LG />}/>
                            <Route path="/Ketchen/Cooker/Pigeon" element={<Pegeon />}/>
                            <Route path="/Mens/Shoes/Campus" element={<Campus />}/>
                            <Route path="/Mens/Kurta/Manyavar" element={<Manyavar />}/>
                            <Route path="/Women/Saree/TJSaree" element={<TJsaree />}/>
                            <Route path="/Women/Handbag/Fostelo" element={<Fostelo />}/>


                            <Route path="/login" element={<LoginPage />} />
                            <Route path="/register" element={<RegisterPage />} />
                            <Route path="/cart" element={<Cart />} />
                            <Route path="/SearchItem" element={<SearchItem />} />
                    </Routes>
                </DataStore>    
            </div>
        </>
    )
}

export default TopTwoHeader;