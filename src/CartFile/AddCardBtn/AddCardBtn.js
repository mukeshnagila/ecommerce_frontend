// AddToCartButton.js
import React from "react";
import { useDispatch } from "react-redux";
import { addToCart } from "../CartFunctions/cartAction";

const AddCardBtn = ({ product }) => {
  const dispatch = useDispatch();

  const handleAddToCart = () => {
    dispatch(addToCart(product));
  };

  return (
    <button className="cartbtn" onClick={handleAddToCart}>
      Add to Cart
    </button>
  );
};

export default AddCardBtn;
