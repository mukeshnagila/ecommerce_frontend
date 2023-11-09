import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { store } from "../Store/DataStore";
import AddCardBtn from "../CartFile/AddCardBtn/AddCardBtn";

function Mobile() {

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

                            {/* <h2 className="ECname">LapTop's</h2>
                            <ul>
                                <li>Lenovo</li>
                                <li>Asus</li>
                                <li>Apple</li>
                            </ul>

                            <h2 className="ECname">Watche's</h2>
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
                            {Sdata.filter((item) => item.subcategory === "mobile").map((item, index) => {
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

export default Mobile;