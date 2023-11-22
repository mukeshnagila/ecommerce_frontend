/////////////////////////////////////////////// FrontEnd Payment Start ///////////////////////////////////////////

import React, { useEffect, useMemo, useState } from "react";
import "../CartFile/Cart.css";
import { useSelector, useDispatch } from "react-redux";
import { addToCart, decreaseItemQuantity, placeOrderAction } from "./CartFunctions/cartAction";
import { useNavigate } from "react-router-dom";

function Cart() {
    const cartItems = useSelector((state) => state.cart.items) || [];
    const dispatch = useDispatch();
    const nav = useNavigate();

    // Wrap the initialization of "cartItems" in its own useMemo() Hook
    //next line is the simple warning ignore this 
    const memoizedCartItems = useMemo(() => cartItems, [cartItems]);// eslint-disable-next-line 
    const [totalAmount, setTotalAmount] = useState(0);
    const [isPaypalButtonVisible, setIsPaypalButtonVisible] = useState(true);

    useEffect(() => {
        const calculatedTotalAmount = memoizedCartItems.reduce((total, item) => total + item.price * item.quantity, 0);
        setTotalAmount(calculatedTotalAmount);
    }, [memoizedCartItems]);

    const increaseQuantity = (item) => {
        dispatch(addToCart(item));
    }

    const decreaseQuantity = (item) => {
        dispatch(decreaseItemQuantity(item.id));
    }

    const goTOHome = () => {
        nav("/");
    };

    const handlePaypalButton = async () => {
        try {
            const totalItems = cartItems.reduce((total, item) => total + item.quantity, 0);
            console.log(totalItems);

            const paypalButtonContainer = document.getElementById("paypal-button-container");
            setIsPaypalButtonVisible(false);
            window.paypal.Buttons({
                createOrder: (data, actions) => {
                    return actions.order.create({
                        purchase_units: [
                            {
                                description: "Your order description here",
                                amount: {
                                    currency_code: "USD",
                                    value: totalAmount.toFixed(2),
                                },
                            },
                        ],
                    });
                },
                onApprove: (data, actions) => {
                    return actions.order.capture().then((details) => {
                        dispatch(placeOrderAction());

                        alert("Your Order Is Placed. Thank You For Shopping!");
                    });
                },
                onError: (err) => {
                    console.error("PayPal error:", err);
                    alert("Payment Failed. Please try again.");
                },
            }).render(paypalButtonContainer);
        } catch (error) {
            console.error("Error initiating payment:", error);
            alert("Payment Failed. Please try again.");
        }
    };

    return (
        <>
            <h1 className="forMQ" style={{ color: "blueviolet", textAlign: "center" }}>Your Cart</h1>
            <div className="outer-box">
                <div className="middle-box">
                    <div className="content1">
                            {cartItems.length === 0 ? (
                                <>  
                                        <h3 className="cartempty">Your Cart Is Empty...............</h3>
                                </>
                            ) : (
                                <> 
                                        <div className="contentHeading">
                                            <h3>Image</h3>
                                            <h3>Name</h3>
                                            <h3>Qnt</h3>
                                            <h3>Price</h3>
                                        </div>
                                        <hr />

                                        {cartItems.map((item) => (
                                            <div className="contentdata" key={item.id}>
                                                <img className="cartimg" src={item.image} alt="NotFound" />
                                                <h6>{item.name.slice(0, 11)}.... </h6>
                                                <h5>
                                                    <button onClick={() => decreaseQuantity(item)}>-</button> {item.quantity} <button onClick={() => increaseQuantity(item)}>+</button>
                                                </h5>
                                                <h4>₹{item.price}.00</h4>
                                            </div>
                                        ))}
                                </>
                            )}
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
                                Subtotal <span className="ODI">({cartItems.length} items)</span>: ₹<span className="amount">{totalAmount}.00</span>
                            </h3>
                            {cartItems.length > 0 ? (
                                <>
                                     {isPaypalButtonVisible && (
                                        <button className="cartbtn" onClick={handlePaypalButton}>Proceed to Buy</button>
                                     )}
                                    <div id="paypal-button-container"></div>
                                </>
                            ) : (
                                <>
                                    <button className="cartbtn" onClick={goTOHome}>Shop More ....</button>
                                </>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Cart;


/////////////////////////////////////////////// FrontEnd Payment End ///////////////////////////////////////////



/////////////////////////////////////////////////////// New Start ////////////////////////////////////////////////

// import React, { useEffect, useMemo, useState } from "react";
// import "../CartFile/Cart.css";
// import { useSelector, useDispatch } from "react-redux";
// import { addToCart, decreaseItemQuantity, placeOrderAction } from "./CartFunctions/cartAction";
// import { useNavigate } from "react-router-dom";
// import axios from "axios";

// function Cart() {
//     const cartItems = useSelector((state) => state.cart.items) || [];
//     const dispatch = useDispatch();
//     const nav = useNavigate();

//     const memoizedCartItems = useMemo(() => cartItems, [cartItems]);
//     const [totalAmount, setTotalAmount] = useState(0);

//     useEffect(() => {
//         const calculatedTotalAmount = memoizedCartItems.reduce((total, item) => total + item.price * item.quantity, 0);
//         setTotalAmount(calculatedTotalAmount);
//     }, [memoizedCartItems]);

//     const increaseQuantity = (item) => {
//         dispatch(addToCart(item));
//     }

//     const decreaseQuantity = (item) => {
//         dispatch(decreaseItemQuantity(item.id));
//     }

//     const goTOHome = () => {
//         nav("/");
//     };

//     const handlePaypalButton = async () => {
//         try {
//             const token = localStorage.getItem("token");
//             console.log("TOKEN", token);
//             const config = {
//                 headers: {
//                     'authorization': `Bearer ${token}`,
//                     'Content-Type': 'application/json',
//                 },
//             };
    
//             const response = await axios.post("http://localhost:5008/api/payment/pay", {
//                 subtotal: totalAmount,
//                 products: cartItems,
//             }, config);
    
//             if (response.status === 200) {
//                 const { redirectUrl } = response.data;
    
//                 const paypalButtonContainer = document.getElementById("paypal-button-container");
//                 window.paypal.Buttons({
//                     createOrder: (data, actions) => {
//                         return actions.order.create({
//                             purchase_units: [
//                                 {
//                                     description: "Your order description here",
//                                     amount: {
//                                         currency_code: "USD",
//                                         value: totalAmount.toFixed(2),
//                                     },
//                                 },
//                             ],
//                         });
//                     },
//                     onApprove: (data, actions) => {
//                         return actions.order.capture().then((details) => {
//                             dispatch(placeOrderAction());
    
//                             alert("Your Order Is Placed. Thank You For Shopping!");
//                         });
//                     },
//                     onError: (err) => {
//                         console.error("PayPal error:", err);
//                         alert("Payment Failed. Please try again.");
//                     },
//                 }).render(paypalButtonContainer);
    
//                 window.location.href = redirectUrl;
//             } else {
//                 console.error("Unexpected response status:", response.status);
//                 alert("Payment Failed. Please try again.");
//             }
//         } catch (error) {
//             console.error("Error initiating payment:", error);
//             console.log("Request payload:", {
//                 subtotal: totalAmount,
//                 products: cartItems,
//             });
//             alert("Payment Failed. Please try again.");
//         }
//     };
    

//     const totalItems = cartItems.reduce((total, item) => total + item.quantity, 0);

//     return (
//         <>
//             <h1 className="forMQ" style={{ color: "blueviolet", textAlign: "center" }}>Your Cart</h1>
//             <div className="outer-box">
//                 <div className="middle-box">
//                     <div className="content1">
//                         <div className="contentHeading">
//                             <h3>Image</h3>
//                             <h3>Name</h3>
//                             <h3>Qnt</h3>
//                             <h3>Price</h3>
//                         </div>
//                         <hr />

//                         {cartItems.map((item) => (
//                             <div className="contentdata" key={item.id}>
//                                 <img className="cartimg" src={item.image} alt="NotFound" />
//                                 <h6>{item.name.slice(0, 11)}.... </h6>
//                                 <h5>
//                                     <button onClick={() => decreaseQuantity(item)}>-</button> {item.quantity} <button onClick={() => increaseQuantity(item)}>+</button>
//                                 </h5>
//                                 <h4>₹{item.price}.00</h4>
//                             </div>
//                         ))}
//                     </div>

//                     <div className="content2">
//                         <h2>Total</h2>
//                         <hr />
//                         <div className="orderdetail">
//                             <p className="ODp">
//                                 <span className="ODpart1">Part of your order qualifies for FREE Delivery.</span>
//                                 <span className="ODpart2"> Select this option at checkout...</span>
//                             </p>
//                             <h3>
//                                 Subtotal <span className="ODI">({totalItems} items)</span>: ₹<span className="amount">{totalAmount}.00</span>
//                             </h3>
//                             {totalItems > 0 ? (
//                                 <>
//                                     <button className="cartbtn" onClick={handlePaypalButton}>Proceed to Buy</button>
//                                     <div id="paypal-button-container"></div>
//                                 </>
//                             ) : (
//                                 <>
//                                     <button className="cartbtn" onClick={goTOHome}>Shop More ....</button>
//                                 </>
//                             )}
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         </>
//     );
// }

// export default Cart;


////////////////////////////////////////////////// NEW END /////////////////////////////////////////////////////


// import React, { useEffect, useState } from "react";
// import "../CartFile/Cart.css";
// import { useSelector, useDispatch } from "react-redux";
// import { addToCart, decreaseItemQuantity, placeOrderAction } from "./CartFunctions/cartAction"; // Import Redux actions here

// function Cart() {
//     const cartItems = useSelector((state) => state.cart.items) || [];
//     const dispatch = useDispatch();
//     const [totalAmount, setTotalAmount] = useState(0);

//     useEffect(() => {
//         // Calculate totalAmount whenever cartItems change
//         const total = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
//         setTotalAmount(total);
//     }, [cartItems]);
    
//     useEffect(() => {
//         // // Calculate totalAmount whenever cartItems change
//         // const total = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
//         // setTotalAmount(total);

//         // Initialize the PayPal script
//         const paypalScript = window.paypal.Buttons({
//             createOrder: (data, actions) => {
//                 return actions.order.create({
//                     purchase_units: [
//                         {
//                             description: "Your order description here",
//                             amount: {
//                                 currency_code: "USD",
//                                 value: totalAmount.toFixed(2),
//                             },
//                         },
//                     ],
//                 });
//             },
//             onApprove: (data, actions) => {
//                 return actions.order.capture().then((details) => {
//                     dispatch(placeOrderAction());
//                     alert("Your Order Is Placed. Thank You For Shopping!");
//                 });
//             },
//             onError: (err) => {
//                 console.error("PayPal error:", err);
//             },
//         });

//         // Check if the PayPal button container already has content
//         const paypalContainer = document.getElementById("paypal-button-container");
//         paypalContainer.innerHTML = ""; // Clear the container before rendering
//         paypalScript.render("#paypal-button-container");
//     }, [totalAmount, dispatch]);

    

//     const increaseQuantity = (item) => {
//         dispatch(addToCart(item));
//     }

//     const decreaseQuantity = (item) => {
//         console.log("Decreasing quantity for item:", item);
//         dispatch(decreaseItemQuantity(item.id));
//     }

//     const totalItems = cartItems.reduce((total, item) => total + item.quantity, 0);

//     return (
//         <>
//             <h1 className="forMQ" style={{ color: "blueviolet", textAlign: "center" }}>Your Cart</h1>
//             <div className="outer-box">
//                 <div className="middle-box">
//                     <div className="content1">
//                         <div className="contentHeading">
//                             <h3>Image</h3>
//                             <h3>Name</h3>
//                             <h3>Qnt</h3>
//                             <h3>Price</h3>
//                         </div>
//                         <hr />

//                         {cartItems.map((item) => (
//                             <div className="contentdata" key={item.id}>
//                                 <img className="cartimg" src={item.image} alt="NotFound" />
//                                 <h6>{item.name.slice(0, 11)}.... </h6>
//                                 <h5>
//                                     <button onClick={() => decreaseQuantity(item)}>-</button> {item.quantity} <button onClick={() => increaseQuantity(item)}>+</button>
//                                 </h5>
//                                 <h4>₹{item.price}.00</h4>
//                             </div>
//                         ))}
//                     </div>

//                     <div className="content2">
//                         <h2>Total</h2>
//                         <hr />
//                         <div className="orderdetail">
//                             <p className="ODp">
//                                 <span className="ODpart1">Part of your order qualifies for FREE Delivery.</span>
//                                 <span className="ODpart2"> Select this option at checkout...</span>
//                             </p>
//                             <h3>
//                                 Subtotal <span className="ODI">({totalItems} items)</span>: ₹<span className="amount">{totalAmount}.00</span>
//                             </h3>
//                             <button className="cartbtn">Proceed to Buy</button>
//                             <div id="paypal-button-container"></div>
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         </>
//     );
// }

// export default Cart;


/////////////////////////////////////////// Again Start ///////////////////////////////////////////////////////////


// // ... (previous imports)

// import { useEffect, useState } from "react";
// import { useSelector, useDispatch } from "react-redux";
// import { addToCart, decreaseItemQuantity, placeOrderAction } from "./CartFunctions/cartAction";
// import { useNavigate } from "react-router-dom";

// function Cart() {
//   const cartItems = useSelector((state) => state.cart.items) || [];
//   const dispatch = useDispatch();
//   const nav = useNavigate();

//   const [paymentData, setPaymentData] = useState(null);

//   const increaseQuantity = (item) => {
//     dispatch(addToCart(item));
//   };

//   const decreaseQuantity = (item) => {
//     dispatch(decreaseItemQuantity(item.id));
//   };

//   const goTOHome = () => {
//     nav("/");
//   };

//   const totalItems = cartItems.reduce((total, item) => total + item.quantity, 0);
//   const totalAmount = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);

//   const handlePaypalButton = async () => {
//     try {
//       const payload = {
//         subtotal: totalAmount,
//         products: cartItems,
//       };

//       const token = sessionStorage.getItem("token");
//       const response = await fetch("http://localhost:5008/api/payment/pay", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${token}`, // Include the JWT token here
//         },
//         body: JSON.stringify(payload),
//       });

//       if (!response.ok) {
//         throw new Error(
//           `Error initiating payment: ${response.status} - ${response.statusText}`
//         );
//       }

//       const data = await response.json();
//       setPaymentData(data);
//     } catch (error) {
//       console.error("Error initiating payment:", error);
//     }
//   };

//   useEffect(() => {
//     const script = document.createElement("script");
//     script.src = "https://www.paypal.com/sdk/js?client-id=AUElyirxebVFvYz_NTs_1hsTnebHA-PgC63O9qM7ulQnlDtu4o92LMDYeV6-PQ-b9Kd4_cG4UQ7nQkRX";
//     script.async = true;
//     script.onload = () => {
//       handlePaypalButton();
//     };
//     document.body.appendChild(script);

//     return () => {
//       document.body.removeChild(script);
//     };
//   }, [totalAmount, handlePaypalButton]);

  

//   return (
    // <>
    //     <h1 className="forMQ" style={{ color: "blueviolet", textAlign: "center" }}>Your Cart</h1>
    //     <div className="outer-box">
    //         <div className="middle-box">
    //             <div className="content1">
    //                 <div className="contentHeading">
    //                     <h3>Image</h3>
    //                     <h3>Name</h3>
    //                     <h3>Qnt</h3>
    //                     <h3>Price</h3>
    //                 </div>
    //                 <hr />

    //                 {cartItems.map((item) => {
    //                     return (
    //                         <div className="contentdata" key={item.id}>
    //                             <img className="cartimg" src={item.image} alt="NotFound" />
    //                             <h6>{item.name.slice(0, 11)}.... </h6>
    //                             <h5>
    //                                 <button onClick={() => decreaseQuantity(item)}>-</button> {item.quantity} <button onClick={() => increaseQuantity(item)}>+</button>
    //                             </h5>
    //                             <h4>₹{item.price}.00</h4>
    //                         </div>
    //                     );
    //                 })}
    //             </div>

    //             <div className="content2">
    //                 <h2>Total</h2>
    //                 <hr />
    //                 <div className="orderdetail">
    //                     <p className="ODp">
    //                         <span className="ODpart1">Part of your order qualifies for FREE Delivery.</span>
    //                         <span className="ODpart2"> Select this option at checkout...</span>
    //                     </p>
    //                     <h3>
    //                         Subtotal <span className="ODI">({totalItems} items)</span>: ₹<span className="amount">{totalAmount}.00</span>
    //                     </h3>
    //                     {totalItems > 0 ? (
    //                         <>
    //                             <button className="cartbtn" onClick={handlePaypalButton}>Proceed to Buy</button>
    //                             <div id="paypal-button-container"></div>
    //                         </>
    //                     ) : (
    //                         <>
    //                             <button className="cartbtn" onClick={goTOHome}>Shop More ....</button>
    //                         </>
    //                     )}
    //                 </div>
    //             </div>
    //         </div>
    //     </div>
    // </>
// );
// }

// export default Cart;


///////////////////////////////////////////// Again Stop //////////////////////////////////////////////////////




//////////////////////////////////////////// Other Aproch /////////////////////////////////////////////


// import React from "react";
// import "../CartFile/Cart.css";
// import { useSelector, useDispatch } from "react-redux";
// import { addToCart, decreaseItemQuantity, placeOrderAction } from "./CartFunctions/cartAction"; // Import Redux actions here
// import { useNavigate } from "react-router-dom";

// function Cart() {
//     const cartItems = useSelector((state) => state.cart.items) || [];
//     // console.log(cartItems);

//     const dispatch = useDispatch();

//     const increaseQuantity = (item) => {
//         dispatch(addToCart(item));
//     }

//     const nav = useNavigate();
//     const goTOHome = () => {
//         nav("/")
//     }

//     // const decreaseQuantity = (item) => {
//     //     // console.log("Decreasing quantity for item:", item);
//     //     if (item.quantity > 1) {
//     //         dispatch(decreaseItemQuantity(item));
//     //     } else {
//     //         dispatch(removeItemFromCart(item.id));
//     //     }
//     // }

//     const decreaseQuantity = (item) => {
//         console.log("Decreasing quantity for item:", item);
//         dispatch(decreaseItemQuantity(item.id));
//     }

//     // const token = localStorage.getItem("token");
//     const placeOrder = async() => {
//         dispatch(placeOrderAction());
//         alert("Your Order Is Placed Thank You For Shopping")
//     //     try {
//     //         const payload = {
//     //             subtotal: totalAmount,
//     //             products: cartItems,
//     //         };

//     //         const response = await fetch("http://localhost:5008/api/payment/pay", {
//     //             method: "POST",
//     //             headers: {
//     //                 "Content-Type": "application/json",
//     //                 Authorization: `Bearer ${token}`,
//     //             },
//     //             // body: JSON.stringify({
//     //             //     subtotal: totalAmount,
//     //             //     products: cartItems,
//     //             // }),
                
//     //             body: JSON.stringify(payload),
//     //         });
    
//     //         const data = await response.json();
//     //         window.location.href = data.redirectUrl; // Redirect to PayPal payment page
//     //     } catch (error) {
//     //         console.error("Error placing order:", error);
//     //     }
//     }
//     // const placeOrder = async () => {
//     //     try {
//     //         const payload = {
//     //             subtotal: totalAmount,
//     //             products: cartItems,
//     //         };
    
//     //         const response = await fetch("http://localhost:5008/api/payment/pay", {
//     //             method: "POST",
//     //             headers: {
//     //                 "Content-Type": "application/json",
//     //                 "Authorization": `Bearer ${token}`, // Include the JWT token here
//     //             },
//     //             body: JSON.stringify(payload),
//     //         });
    
//     //         if (!response.ok) {
//     //             throw new Error(`Error placing order: ${response.status} - ${response.statusText}`);
//     //         }
    
//     //         const data = await response.json();
//     //         window.location.href = data.redirectUrl; // Redirect to PayPal payment page
//     //     } catch (error) {
//     //         console.error("Error placing order:", error);
//     //     }
//     // }
//     const handlePaypalButton = () => {
//         // Initialize the PayPal script
//         window.paypal.Buttons({
//             createOrder: (data, actions) => {
//                 return actions.order.create({
//                     purchase_units: [
//                         {
//                             description: "Your order description here",
//                             amount: {
//                                 currency_code: "USD",
//                                 value: totalAmount.toFixed(2), // Format the total amount to two decimal places
//                             },
//                         },
//                     ],
//                 });
//             },
//             onApprove: (data, actions) => {
//                 return actions.order.capture().then((details) => {
//                     dispatch(placeOrderAction());
                
//                     // Show the alert
//                     alert("Your Order Is Placed. Thank You For Shopping!");
                
//                     // Close the PayPal popup
//                     window.parent.postMessage('closePaypalPopup', '*');
//                 });
//             },
//             onError: (err) => {
//                 console.error("PayPal error:", err);
//                 // Handle error scenarios
//             },
//         }).render("#paypal-button-container"); // Render the button in the specified container
//     };
    
    

//     const totalItems = cartItems.reduce((total, item) => total + item.quantity, 0);
//     // const totalAmount = cartItems.reduce((total, item) => total + item.price, 0);
//     // ... (previous code)

//     const totalAmount = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);

//     // ... (remaining code)

//     return (
//         <>
//             <h1 className="forMQ" style={{ color: "blueviolet", textAlign: "center" }}>Your Cart</h1>
//             <div className="outer-box">
//                 <div className="middle-box">
//                     <div className="content1">
//                         <div className="contentHeading">
//                             <h3>Image</h3>
//                             <h3>Name</h3>
//                             <h3>Qnt</h3>
//                             <h3>Price</h3>
//                         </div>
//                         <hr />

//                         {cartItems.map((item) => {
//                             return (
//                                 <div className="contentdata" key={item.id}>
//                                     <img className="cartimg" src={item.image} alt="NotFound" />
//                                     <h6>{item.name.slice(0, 11)}.... </h6>
//                                     <h5>
//                                         <button onClick={() => decreaseQuantity(item)}>-</button> {item.quantity} <button onClick={() => increaseQuantity(item)}>+</button>
//                                     </h5>
//                                     <h4>₹{item.price}.00</h4>
//                                 </div>
//                             );
//                         })}
//                     </div>

//                     <div className="content2">
//                         <h2>Total</h2>
//                         <hr />
//                         <div className="orderdetail">
//                             <p className="ODp">
//                                 <span className="ODpart1">Part of your order qualifies for FREE Delivery.</span>
//                                 <span className="ODpart2"> Select this option at checkout...</span>
//                             </p>
//                             <h3>
//                                 Subtotal <span className="ODI">({totalItems} items)</span>: ₹<span className="amount">{totalAmount}.00</span>
//                             </h3>
//                             {totalItems > 0 ? (
//                                 <>
//                                     <button className="cartbtn" onClick={handlePaypalButton}>Proceed to Buy</button>
//                                     <div id="paypal-button-container"></div>
//                                 </>
//                             ) : (
//                                 <>
//                                     <button className="cartbtn" onClick={goTOHome}>Shop More ....</button>
//                                 </>
//                             )}
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         </>
//     );
// }

// export default Cart;




/////////////////////////////////////////////////////// BY RAZOREPAY ////////////////////////////////////////////////

// import React, { useState } from "react";
// import { useSelector, useDispatch } from "react-redux";
// import { addToCart, decreaseItemQuantity } from "./CartFunctions/cartAction";
// import axios from "axios";
// import Razorpay from "razorpay";
// import "../CartFile/Cart.css";

// function Cart() {
//   const cartItems = useSelector((state) => state.cart.items) || [];
//   const dispatch = useDispatch();

//   const increaseQuantity = (item) => {
//     dispatch(addToCart(item));
//   };

//   const decreaseQuantity = (item) => {
//     console.log("Decreasing quantity for item:", item);
//     dispatch(decreaseItemQuantity(item.id));
//   };

//   const [totalAmount, setTotalAmount] = useState(
//     cartItems.reduce((total, item) => total + item.price * item.quantity, 0)
//   );

//   const razorpayOptions = {
//     key: "rzp_test_0PMp2JCc77RCzY",
//     amount: totalAmount * 100, // Convert amount to paisa
//     currency: "INR",
//     name: "Your Company Name",
//     description: "Test Transaction",
//     image: "Your Company Logo URL",
//     order_id: "", // Will be set dynamically
//     handler: async (response) => {
//       try {
//         const verifyUrl = "http://localhost:8080/api/payment/verify";
//         const { data } = await axios.post(verifyUrl, response);
//         console.log(data);
//         // Handle success response
//         alert("Payment Successful!");
//       } catch (error) {
//         console.log(error);
//         // Handle error response
//         alert("Payment failed. Please try again.");
//       }
//     },
//     theme: {
//       color: "#3399cc",
//     },
//   };

//   const initPayment = async () => {
//     try {
//       // Send a request to your server to create an order
//       const orderResponse = await axios.post("http://localhost:8080/api/payment/orders", {
//         amount: totalAmount * 100, // Convert amount to paisa
//       });

//       const orderId = orderResponse.data.data.id;
//       // Set order_id in Razorpay options
//       razorpayOptions.order_id = orderId;

//       // Initialize Razorpay payment
//       const rzp = new Razorpay(razorpayOptions);
//       rzp.open();
//     } catch (error) {
//       console.error("Error initializing payment:", error);
//       // Handle error
//       alert("Error initializing payment. Please try again.");
//     }
//   };

//   const placeOrder = () => {
//     // Place your order logic here
//     // For demonstration purposes, I'm calling initPayment directly
//     initPayment();
//   };

//   return (
//     <>
//       <h1 className="forMQ" style={{ color: "blueviolet", textAlign: "center" }}>
//         Your Cart
//       </h1>
//       <div className="outer-box">
//         <div className="middle-box">
//           <div className="content1">
//             <div className="contentHeading">
//               <h3>Image</h3>
//               <h3>Name</h3>
//               <h3>Qnt</h3>
//               <h3>Price</h3>
//             </div>
//             <hr />

//             {cartItems.map((item) => (
//               <div className="contentdata" key={item.id}>
//                 <img className="cartimg" src={item.image} alt="NotFound" />
//                 <h6>{item.name.slice(0, 11)}.... </h6>
//                 <h5>
//                   <button onClick={() => decreaseQuantity(item)}>-</button> {item.quantity}{" "}
//                   <button onClick={() => increaseQuantity(item)}>+</button>
//                 </h5>
//                 <h4>₹{item.price}.00</h4>
//               </div>
//             ))}
//           </div>

//           <div className="content2">
//             <h2>Total</h2>
//             <hr />
//             <div className="orderdetail">
//               <p className="ODp">
//                 <span className="ODpart1">Part of your order qualifies for FREE Delivery.</span>
//                 <span className="ODpart2"> Select this option at checkout...</span>
//               </p>
//               <h3>
//                 Subtotal <span className="ODI">({cartItems.length} items)</span>: ₹
//                 <span className="amount">{totalAmount}.00</span>
//               </h3>
//               <button className="cartbtn" onClick={placeOrder}>
//                 Proceed to Buy
//               </button>
//             </div>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// }

// export default Cart;
