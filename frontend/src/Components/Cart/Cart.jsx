import React from "react";
import { motion } from "framer-motion";
import { useSelector, useDispatch } from "react-redux";
import { removeFromCart, clearCart } from "../../redux/slice/cartSlice";
import { getCartAPI } from "../../services/cart/cart";

const Cart = () => {
  // ! Get Cart state from Redux store
  const { cartItems, totalQuantity, totalPrice } = useSelector(
    (state) => state.cart
  );

  // ! Get cart items from API
  console.log(getCartAPI());

  const dispatch = useDispatch();

  // ! Remove item from cart
  const handleRemoveFromCart = (productId) => {
    dispatch(removeFromCart({ productId }));
  };

  // ! Clear cart
  const handleClearCart = () => {
    dispatch(clearCart());
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5 }}
      className=" top-0 left-0 w-full h-full bg-white shadow-md p-4 md:p-6 lg:p-8 xl:p-10"
    >
      <div className="flex justify-between items-center mx-4 p-1 pr-2 shadow-lg">
        <div className="w-1/4">
          <img
            src="https://cdn.pixabay.com/photo/2018/01/31/09/57/coffee-3120750_1280.jpg"
            alt=""
          />
        </div>
        <div>
          <h1 className="text-xl font-bold">Cappuccino</h1>
          <p className="text-gray-500">
            Quantity:{" "}
            <span>
              <select name="quantity" id="quantity">
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
                <option value="6">6</option>
                <option value="7">7</option>
                <option value="8">8</option>
                <option value="9">9</option>
                <option value="10">10</option>
              </select>
            </span>
          </p>
          <div className="flex justify-between">
            <button>Delete</button>
          </div>
        </div>
        <div>
          <h1 className="text-xl font-bold">₹200</h1>
        </div>
      </div>
    </motion.div>
  );
};

export default Cart;
