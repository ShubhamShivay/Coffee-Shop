import React from "react";
import { motion } from "framer-motion";
import { useSelector, useDispatch } from "react-redux";
import { removeFromCart, clearCart } from "../../redux/slice/cartSlice";

const Cart = () => {
  // ! Get Cart state from Redux store
  const { cartItems, totalQuantity, totalPrice } = useSelector(
    (state) => state.cart
  );

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
      {cartItems.length === 0 ? (
        <p className="text-center">No items in cart.</p>
      ) : (
        <div className="flex flex-col">
          {cartItems.map((item) => (
            <div key={item.product._id} className="flex items-center mb-5">
              <img
                className="mr-4"
                src={item.product.image}
                alt={item.product.name}
                width={100}
              />
              <div>
                <h3>{item.product.name}</h3>
                <p>{item.product.description}</p>
                <p>Price: ${item.product.price}</p>
                <p>Quantity: {item.quantity}</p>
                <p>Total: ${item.product.price * item.quantity}</p>
              </div>
              <button onClick={() => handleRemoveFromCart(item.product._id)}>
                Remove
              </button>
            </div>
          ))}
          <div className="mt-4">
            <h4>Total Items: {totalQuantity}</h4>
            <h4>Total Price: ${totalPrice}</h4>
            <button onClick={handleClearCart}>Clear Cart</button>
          </div>
        </div>
      )}
    </motion.div>
  );
};

export default Cart;
