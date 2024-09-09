import React from "react";
import { motion } from "framer-motion";
import ProductCard from "../Cards/ProductCard";
import { Link } from "react-router-dom";
import { useMutation, useQuery } from "@tanstack/react-query";
import { getProductsAPI } from "../../services/product/productService";

export const Home = () => {
  //! ---------------------------------------
  //! Fetching Products
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["products"],
    queryFn: getProductsAPI,
  });

  // console.log(data);
  //! -------------------------------------

  

  //! Function for scrolling to products
  const handleScroll = () => {
    const products = document.getElementById("products");
    products.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      <div className="bg-[#2C150F] w-full flex flex-col md:flex-row px-4 min-h-screen items-center">
        <div className="flex flex-col justify-center gap-4 pt-2">
          <motion.h1
            initial={{ y: "-100vh", opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{
              type: "spring",
              duration: 1.5,
              delay: 0.1,
              stiffness: 120,
            }}
            className="text-5xl text-white font-bold pb-4 pr-4"
          >
            Discover the art of perfect coffee
          </motion.h1>
          <motion.p
            initial={{ x: "-100vw" }}
            animate={{ x: 0 }}
            transition={{
              type: "spring",
              delay: 0.3,
              duration: 1.5,
              stiffness: 120,
            }}
            className="text-white text-lg"
          >
            Our coffee is handcrafted with love and passion. We source our
            coffee from around the world. Experience the taste of coffee
          </motion.p>
          <div className="pb-4 flex flex-row justify-around">
            <motion.button
              onClick={handleScroll}
              type="button"
              className="text-white text-lg bg-black  px-5 py-3 rounded-sm "
              whileHover={{
                scale: 1.1,

                transition: {
                  yoyo: 10,
                },
              }}
              initial={{ x: "-100vw" }}
              animate={{ x: 0 }}
              transition={{
                type: "spring",
                delay: 0.3,
                duration: 1.5,
                stiffness: 120,
              }}
            >
              Order Now
            </motion.button>
            <motion.button
              type="button"
              className="text-white text-lg bg-black  px-5 py-3 rounded-sm"
              whileHover={{
                scale: 1.1,

                transition: {
                  yoyo: 10,
                },
              }}
              initial={{ x: "100vw" }}
              animate={{ x: 0 }}
              transition={{
                type: "spring",
                delay: 0.3,
                duration: 1.5,
                stiffness: 120,
              }}
            >
              <a href="#products">Explore More</a>
            </motion.button>
          </div>
        </div>
        <motion.div
          className="w-full md:w-1/2 shadow-2xl rounded-3xl"
          initial={{ scale: 0 }}
          animate={{ rotate: 360, scale: 1 }}
          transition={{
            type: "spring",
            stiffness: 260,
            damping: 20,
          }}
        >
          <img
            className="rounded-3xl"
            src="https://cdn.pixabay.com/photo/2018/01/31/09/57/coffee-3120750_1280.jpg"
            alt="Coffee image"
          />
        </motion.div>
      </div>

      {/* Products */}

      <div
        id="products"
        className="flex flex-col items-center bg-[#613328] min-h-fit p-4"
      >
        <h1 className="text-3xl font-bold  pb-4">Our Products</h1>
        <p className="text-lg text-gray-300 pb-4">
          Our coffee is handcrafted with love and passion.
        </p>
        <div className="grid lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-4">
          {data?.products?.map((product) => {
            return (
              <ProductCard
                key={product._id}
                name={product.name}
                price={product.price}
                image={
                  product.image ||
                  "https://cdn.pixabay.com/photo/2018/01/31/09/57/coffee-3120750_1280.jpg"
                }
                description={product.description}
              />
            );
          })}

          <ProductCard
            id={2}
            name="Cappuccino"
            image="https://cdn.pixabay.com/photo/2018/01/31/09/57/coffee-3120750_1280.jpg"
            description="Cappuccino is a coffee-based drink made with equal parts
          of espresso and steamed milk."
            price="5.99"
          />
        </div>
      </div>
    </>
  );
};
