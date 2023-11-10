import React, { useContext } from "react";
import Carousel from "../MainContent/carousel/Carousel";
import "../CSS/style.css";
import shipping from "../images/shipping.svg";
import refund from "../images/refund.svg";
import support from "../images/support.svg";
import { store } from "../Store/DataStore";
import { Link } from 'react-router-dom';
import AddCardBtn from "../CartFile/AddCardBtn/AddCardBtn";


function Home() {

    const [Sdata] = useContext(store);
    // console.log(Sdata);

    return (
        <>
            <div className="startsliderhome">
                <Carousel />
            </div>

            <h1 className="heading">Top Product's</h1>
            <div className="bestproduct">
                    {Sdata.filter((item) => ( (item.category === "Men's" && "Women's") && item.id%3 === 0)).slice(0, 8).map((item, index) => {
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
                    
            </div><br/><br/>

            <h1 className="heading">Shop With Your Family</h1>
            <iframe width="100%" height="523" src="https://www.youtube.com/embed/XM9L8oIJCio" title="Amazon Great Indian Festival | Coming soon | #OpenBoxesOfHappiness (Tamil)" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe><br/>

            <h1 className="heading">Best Product's</h1>
            <div className="bestproduct">
                    {Sdata.filter((data) => ( data.id % 4 === 0 || data.id % 6 === 0 || data.id % 11 === 0 )).slice(0, 8).map((item, index) => {
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
                    
            </div><br/><br/>

            <div className="addvertisegif">
                <img src="https://media.tenor.com/jUKIsKNMilcAAAAC/apple-apple-iphone.gif" alt="gifImg" style={{width: "100%", height: "400px"}}/>
            </div><br/><br/>

            <div className="ourstatus">
                    <div className="status1">
                        <img src={shipping} className="statusIMG" alt="statusIMG"/>
                        <h3>FREE SHIPPING</h3> 
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor minim veniam, quis nostrud reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur</p>
                    </div>
                    <div className="status1">
                        <img src={refund} className="statusIMG" alt="statusIMG"/>
                        <h3>100% REFUND</h3> 
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor minim veniam, quis nostrud reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur</p>
                    </div>
                    <div className="status1">
                        <img src={support} className="statusIMG" alt="statusIMG"/>
                        <h3>SUPPORT 24*7</h3>
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor minim veniam, quis nostrud reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur</p> 
                    </div>
            </div>
            <h1 className="heading">Big Billions Deal Gadgets</h1>        
            <iframe width="100%" height="523" src="https://www.youtube.com/embed/HY2e-bW0jO0" title="Best Smartphones &amp; Electronics Gadgets to buy on Flipkart Big Billion Days! 📦" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen>

            </iframe><br/><br/>
        </>
    )
}

export default Home;
