// AddToCartButton.js
import React from "react";
import { useDispatch } from "react-redux";
import { addToCart } from "../CartFunctions/cartAction";
import { Link } from "react-router-dom";

const AddCardBtn = ({ product }) => {
  const dispatch = useDispatch();

  const handleAddToCart = () => {
    dispatch(addToCart(product));
    alert("Item Added Succefully");
  };

  return (
    <>
    {localStorage.getItem("token") ? (
        <button className="cartbtn" onClick={handleAddToCart}>
               Add to Cart
        </button>):(
          <Link to="/Login">
              <button className="LogintoBuybtn">
                    Login To Buy
              </button>
        </Link>
        )
    }
    </>
  );
};

export default AddCardBtn;
