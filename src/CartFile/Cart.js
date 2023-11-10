
import React from "react";
import "../CartFile/Cart.css";
import { useSelector, useDispatch } from "react-redux";
import { addToCart, decreaseItemQuantity, placeOrderAction } from "./CartFunctions/cartAction"; // Import Redux actions here

function Cart() {
    const cartItems = useSelector((state) => state.cart.items) || [];
    // console.log(cartItems);

    const dispatch = useDispatch();

    const increaseQuantity = (item) => {
        dispatch(addToCart(item));
    }

    // const decreaseQuantity = (item) => {
    //     // console.log("Decreasing quantity for item:", item);
    //     if (item.quantity > 1) {
    //         dispatch(decreaseItemQuantity(item));
    //     } else {
    //         dispatch(removeItemFromCart(item.id));
    //     }
    // }

    const decreaseQuantity = (item) => {
        console.log("Decreasing quantity for item:", item);
        dispatch(decreaseItemQuantity(item.id));
    }

    const placeOrder = () => {
        dispatch(placeOrderAction());
        alert("Your Order Is Placed Thank You For Shopping")
    }
    

    const totalItems = cartItems.reduce((total, item) => total + item.quantity, 0);
    // const totalAmount = cartItems.reduce((total, item) => total + item.price, 0);
    // ... (previous code)

        const totalAmount = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);

    // ... (remaining code)

    return (
        <>
            <h1 style={{ color: "blueviolet", textAlign: "center" }}>Your Cart</h1>
            <div className="outer-box">
                <div className="middle-box">
                    <div className="content1">
                        <div className="contentHeading">
                            <h3>Image</h3>
                            <h3>Name</h3>
                            <h3>Qnt</h3>
                            <h3>Price</h3>
                        </div>
                        <hr />

                        {cartItems.map((item) => {
                            return (
                                <div className="contentdata" key={item.id}>
                                    <img className="cartimg" src={item.image} alt="NotFound" />
                                    <h6>{item.name.slice(0, 11)}.... </h6>
                                    <h5>
                                        <button onClick={() => decreaseQuantity(item)}>-</button> {item.quantity} <button onClick={() => increaseQuantity(item)}>+</button>
                                    </h5>
                                    <h4>Price: ₹{item.price}.00</h4>
                                </div>
                            );
                        })}
                    </div>

                    <div className="content2">
                        <h2>Total</h2>
                        <hr />
                        <div className="orderdetail">
                            <p className="ODp">
                                <span className="ODpart1">Part of your order qualifies for FREE Delivery.</span>
                                <span className="ODpart2"> Select this option at checkout...</span>
                            </p>
                            <h3>
                                Subtotal <span className="ODI">({totalItems} items)</span>: ₹<span className="amount">{totalAmount}.00</span>
                            </h3>
                            <button className="cartbtn" onClick={placeOrder}>Proceed to Buy</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Cart;
