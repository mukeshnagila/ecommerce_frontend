import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { store } from "../Store/DataStore";

function Cooker() {

    const [Sdata] = useContext(store);
    // console.log(Sdata);

    return(
        <>  
            <div className="electronic">
                    <div className="ECatArea">
                        <div className="Ecategory">
                        <h2 className="ECname">Refrigetor's</h2>
                            <ul>
                                <Link className="Link" to="/Ketchen/Refrigetor/LG"><li>LG</li></Link>
                                {/* <Link className="Link" to="/Ketchen/Refrigetor/Samsung"><li>SamSung</li></Link> */}
                            </ul>

                            <h2 className="ECname">Cooker's</h2>
                            <ul>
                                <Link className="Link" to="/Ketchen/Cooker/Pigeon"><li>Pigeon</li></Link>
                            </ul>

                            {/* <h2 className="ECname">Water filter's</h2>
                            <ul>
                                <li>Rolex</li>
                                <li>Sonata</li>
                                <li>Patek Philippe</li>
                            </ul> */}
                            <br/>
                        </div>
                    </div>
                    <div className="Eproduct">
                            <div className="bestproduct">
                            {Sdata.filter((item) => item.subcategory === "Cooker").map((item, index) => {
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

export default Cooker;