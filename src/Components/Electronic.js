import React, { useContext } from "react";
import { Link } from 'react-router-dom';
import { store } from "../Store/DataStore";
import { useDispatch } from "react-redux";
import { addToCart } from "../CartFile/CartFunctions/cartAction";

function Electronic() {
    
    const dispatch = useDispatch()
    
    const [Sdata] = useContext(store);
    // console.log(Sdata);

    const AddToCart = (product) => {
        dispatch(addToCart(product));
    }

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
                                {Sdata.filter((item) => item.category === "electronic").map((item, index) => {
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
                                                <button className="cartbtn" onClick={ () => AddToCart(item)}>Add Cart</button>
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

export default Electronic;