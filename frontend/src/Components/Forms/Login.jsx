import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useMutation } from "@tanstack/react-query";
import { loginAPI } from "../../services/user/users";
import { loginAction } from "../../redux/slice/authSlice";
import { useDispatch } from "react-redux";
import AlertMessage from "../Alert/AlertMessage";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

//! Validation Schema
const validationSchema = Yup.object({
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
  password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
});

const LoginPage = () => {
  // ! Dispatch
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const {
    mutateAsync,
    isPending,
    isError,
    error,
    isSuccess,

    data,
  } = useMutation({
    mutationFn: loginAPI,
    mutationKey: ["login"],
  });

  // console.log(data.message);

  const formik = useFormik({
    initialValues: {
      email: "shubham@gmail.com",
      password: "123456",
    },
    //! Validation
    validationSchema,
    onSubmit: (values) => {
      // console.log(values);

      // http request

      mutateAsync(values)
        .then((data) => {
          //! Dispatch login
          dispatch(loginAction(data));
          //! Save the user into local storage
          localStorage.setItem("user", JSON.stringify(data));
        })
        .catch((err) => {
          console.log(err);
        });
    },
  });

  //! Redirect
  useEffect(() => {
    setTimeout(() => {
      if (isSuccess) {
        navigate("/");
      }
    }, 2000);
  }, [isSuccess, navigate]);

  return (
    <div className="h-screen flex justify-center items-center bg-gray-100">
      <div className="max-w-md w-full p-6 bg-white rounded-lg shadow-md">
        <motion.h2
          initial={{ y: -100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{
            duration: 0.5,
            ease: "easeInOut",
            delay: 0.5,
            type: "spring",
            stiffness: 120,
          }}
          className="text-3xl font-bold text-gray-800 mb-4"
        >
          Login
        </motion.h2>
        {isError && (
          <AlertMessage type="error" message={error.response.data.message} />
        )}
        {isSuccess && <AlertMessage type="success" message={data.message} />}
        {isPending && <AlertMessage type="loading" message="Loading..." />}
        <form onSubmit={formik.handleSubmit}>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="email"
            >
              Email <span className="text-red-500">&#9733;</span>
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="email"
              type="email"
              autoComplete="on"
              placeholder="your@email.com"
              {...formik.getFieldProps("email")}
            />
            {formik.touched.email && formik.errors.email ? (
              <div className="text-red-500">{formik.errors.email}</div>
            ) : null}
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="password"
            >
              Password <span className="text-red-500">&#9733;</span>
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="password"
              type="password"
              placeholder="********"
              {...formik.getFieldProps("password")}
            />
            {formik.touched.password && formik.errors.password ? (
              <div className="text-red-500">{formik.errors.password}</div>
            ) : null}
          </div>
          <div className="flex items-center justify-between">
            <motion.button
              initial={{ x: -100, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{
                ease: "easeInOut",
                type: "spring",
                duration: 1.5,
                delay: 0.3,
                stiffness: 120,
              }}
              whileHover={{
                scale: 1.1,
                testShadow: "0px 0px 8px rgb(255,255,255)",
                boxShadow: "0px 0px 8px rgb(255,255,255)",
                transition: {
                  yoo: Infinity,
                },
              }}
              whileTap={{ scale: 0.9 }}
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="submit"
            >
              Login
            </motion.button>
            <motion.a
              initial={{ x: 100, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{
                ease: "easeInOut",
                type: "spring",
                duration: 1.5,
                delay: 0.3,
                stiffness: 120,
              }}
              whileHover={{
                scale: 1.1,
                testShadow: "0px 0px 8px rgb(255,255,255)",
                boxShadow: "0px 0px 8px rgb(255,255,255)",
                transition: {
                  yoo: Infinity,
                },
              }}
              className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800"
              href=""
            >
              Forgot Password?
            </motion.a>
          </div>
        </form>
        <div className="mt-4 text-center">
          <p className="text-gray-600 text-sm mb-4">New to our platform?</p>

          <Link
            to="/register"
            className="bg-orange-500 hover:bg-orange-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline "
          >
            Sign Up
          </Link>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
