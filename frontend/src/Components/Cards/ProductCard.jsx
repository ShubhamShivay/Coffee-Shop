import React from "react";
import { motion } from "framer-motion";

const ProductCard = ({ id, name, description, price, image }) => {
  return (
    <div
      className="max-w-sm rounded overflow-hidden shadow-lg bg-white"
      key={id}
    >
      <img src={image} alt={name} className="w-full h-48 object-cover" />
      <div className="px-6 py-4">
        <h2 className="text-lg font-bold text-gray-800">{name}</h2>
        <p className="text-gray-600">{description}</p>
        <p className="text-gray-600">${price}</p>
      </div>
      <div className="px-6 py-4">
        <button
          className="bg-orange-500 hover:bg-orange-700 text-white font-bold py-2 px-4 rounded"
          onClick={() => console.log("Add to cart")}
        >
          Add to cart
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
