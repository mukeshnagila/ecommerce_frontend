import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { store } from "../Store/DataStore";
import AddCardBtn from "../CartFile/AddCardBtn/AddCardBtn";

function Laptop() {

    const [Sdata] = useContext(store);
    // console.log(Sdata);

    return(
        <>  
            <div className="electronic">
                    <div className="ECatArea">
                        <div className="Ecategory">
                            <h2 className="ECname">Mobile's</h2>
                            <ul>
                                <Link className="Link" to="/Electronic/Mobile/Iphone"><li>Iphone</li></Link>
                                <Link className="Link" to="/Electronic/Mobile/Samsung"><li>SamSung</li></Link>
                                <Link className="Link" to="/Electronic/Mobile/OnePlus"><li>OnePlus</li></Link>
                            </ul>

                            <h2 className="ECname">LapTop's</h2>
                            <ul>
                                <Link className="Link" to="/Electronic/Laptop/Acer"><li>Acer</li></Link>
                                <Link className="Link" to="/Electronic/Laptop/Apple"><li>Apple</li></Link>
                            </ul>

                            <h2 className="ECname">Watche's</h2>
                            <ul>
                                <Link className="Link" to="/Electronic/Watch/Noise"><li>Noise</li></Link>
                                <Link className="Link" to="/Electronic/Watch/Fastrack"><li>Fastrack</li></Link>
                            </ul>
                            <br/>
                        </div>
                    </div>
                    <div className="Eproduct">
                            <div className="bestproduct">
                            {Sdata.filter((item) => item.subcategory === "Laptop").map((item, index) => {
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
                                                <AddCardBtn product={item}/>
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

export default Laptop;