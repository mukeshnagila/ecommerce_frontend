import React from "react";
import "../CartFile/Cart.css";
import { useSelector } from "react-redux";

function Cart() {

    const cartItem = useSelector((state) => state.cart.items) || []
    console.log(cartItem);

    const totalItems = cartItem.reduce((total, item) => total + item.quantity, 0);
    console.log(totalItems);

    return(
        <>  
                <h1 style={{color: "blueviolet", textAlign: "center"}}>Your Cart</h1>
            <div class="outer-box">
                <div class="middle-box">
                    <div class="content1">
                        <div className="contentHeading">     
                                <h3>Image</h3>
                                <h3>Name</h3>
                                <h3>Qnt</h3>
                                <h3>Price</h3>
                        </div><hr/>

                        {cartItem.map((item) => {
                            return(
                                <>
                                
                                    <div className="contentdata" key={item.id}>     
                                            <img className="cartimg" src={item.image} alt="NotFound" />
                                            <h6>{item.name.slice(0,11)}.... </h6>
                                            <h5><button>-</button> 1 <button>+</button></h5>
                                            <h4>{item.price}</h4>
                                    </div><hr/>
                                </>
                            )
                        })}
                    </div>
                    <div class="content2">
                        <h2>Total</h2><hr/>
                        <div className="orderdetail">
                            <p className="ODp"><span className="ODpart1">Part of your order qualifies for FREE Delivery.</span><span className="ODpart2"> Select this option at checkout...</span></p>
                            <h3>Subtotal <span className="ODI">({totalItems} items)</span>:   ₹<span className="amount">3,164.00</span></h3>
                            <button className="cartbtn">Proceed to Buy</button>
                        </div>
                    </div>
                </div>
            </div>  
        </>
    )
}

export default Cart;