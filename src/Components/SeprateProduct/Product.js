import React, { useContext } from "react"
import "../SeprateProduct/Product.css";
import { store } from "../../Store/DataStore";
import { Link, useParams } from "react-router-dom";
import AddCardBtn from "../../CartFile/AddCardBtn/AddCardBtn";
// import data from "../../../../server_ecom/Store/data";

function Product(){

        const [Sdata] = useContext(store);
        // console.log(Sdata);

        const id = useParams().id;
        // console.log(id);

        const relatedData = Sdata[id].category;
        // console.log(relatedData);
        
    return(
        <>
        
        {Sdata.filter((data) => data.id === parseInt(id)).map((item, index) => {
             
             return(
                <div className="Productpage" key={index}>
                        <div className="forImg">
                                <img className="proImg" src={item.image} alt="productimg" />
                        </div><br/>
                        <div className="forinfo">
                                <div className="forPprice">
                                        <h3 className="proname">{item.name}</h3>
                                        <h1 className="pprice"><span className="pofferprice">₹{item.price}</span> <span className="oldprice">₹{item.oldprice}</span> (5% OFF)</h1>
                                        <p className="freeD">Free Delivery</p>
                                </div><br/>

                                <div className="forPprice">
                                        <p className="forPbrand">BRAND : {item.minicategory}</p>
                                </div><br/><br/>

                                <div className="forPbtn">
                                        <button className="Pcartbtn">Add Cart</button>
                                        <button className="Pbuybtn">Buy Now</button>
                                </div><br/><br/>

                                <div className="forPprice">
                                        <p className="forPdetail">{item.discr}</p>
                                </div>

                        </div>
                </div>
             )   
        })}

            <h1 className="heading">From Your Search</h1>
            <div className="bestproduct">
                {Sdata.filter((data) => (data.category === relatedData) && ( data.id % 4 === 0 || data.id % 6 === 0 || data.id % 2 === 0 )).slice(0, 3).map((item, index) => {
                        return(
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
                        )
                })}    
            </div><br/>

            <div>
                    <img className="foraddgif" src="https://media.tenor.com/yyYPqL6fagUAAAAC/coca-cola-commercial.gif" alt="AddvertisementIMG" />
            </div><br/>
        </>
    )
}

export default Product;