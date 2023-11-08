import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { store } from "../Store/DataStore";

function Kurta() {

    const [Sdata] = useContext(store);
    // console.log(Sdata);

    return(
        <>  
            <div className="electronic">
                    <div className="ECatArea">
                        <div className="Ecategory">
                        <h2 className="ECname">Kurta</h2>
                            <ul>
                                <Link className="Link" to="/Mens/Kurta/Manyavar"><li>Manyavar</li></Link>
                            </ul>

                            {/* <h2 className="ECname">LapTop's</h2>
                            <ul>
                                <li>Lenovo</li>
                                <li>Asus</li>
                                <li>Apple</li>
                            </ul>*/}

                            <h2 className="ECname">Shoes</h2>
                            <ul>
                                <Link className="Link" to="/Mens/Shoes/Campus"><li>Campus</li></Link>
                            </ul> 
                            <br/>
                        </div>
                    </div>
                    <div className="Eproduct">
                            <div className="bestproduct">
                            {Sdata.filter((item) => item.subcategory === "Kurta").map((item, index) => {
                                    return(
                                        <>
                                        <div className="BPitem" key={index}>
                                        <Link to={`/Product/${item.id}`}>
                                            <img className="productimage" src={item.image} alt="Image1" />
                                        </Link>
                                        <div className="Productinfo">
                                                <h2 className="pbrand">{item.minicategory}</h2>
                                                <Link className="Link" to={`/Product/${item.id}`}><p className="pname">{item.name.slice(0, 30)}....</p></Link>
                                                <h2 className="pprice"><span className="pofferprice">₹{item.price}</span> <span className="oldprice">₹{item.oldprice}</span> (20% OFF)</h2>
                                                <button className="cartbtn">Add Cart</button>
                                        </div>
                                        </div> 
                                        </>
                                    )
                                })}
                                

                        </div><br/><br/>
                    </div>
            </div>
            
        </>
    )
}

export default Kurta;