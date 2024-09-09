import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useMutation } from "@tanstack/react-query";
import { registerAPI } from "../../services/user/users";
import AlertMessage from "../Alert/AlertMessage";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

// ! Motion Variants

const containerVariantsLeft = {
  hidden: {
    opacity: 0,
    x: "-100vw",
  },
  visible: {
    opacity: 1,
    x: 0,
    transition: { type: "spring", stiffness: 120, delay: 0.5, duration: 0.5 },
  },
  exit: {
    x: "100vw",
    transition: { ease: "easeInOut" },
  },
};

const containerVariantsTop = {
  hidden: {
    opacity: 0,
    y: "-100vh",
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: "spring", stiffness: 120, delay: 0.3, duration: 0.5 },
  },
  exit: {
    y: "100vh",
    transition: { ease: "easeInOut" },
  },
};

//! Validation Schema

const validationSchema = Yup.object({
  fullname: Yup.string().required("Full Name is required"),
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
  password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password"), null], "Passwords must match")
    .required("Confirm Password is required"),
});

const RegisterPage = () => {
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const { mutateAsync, isPending, isError, error, isSuccess, data } =
    useMutation({
      mutationFn: registerAPI,
      mutationKey: ["register"],
    });

  // console.log(isSuccess)
  const formik = useFormik({
    initialValues: {
      fullname: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
    //! Validation
    validationSchema: validationSchema,
    onSubmit: (values) => {
      mutateAsync(values)
        .then((data) => {
          // console.log(data);
        })
        .catch((err) => {
          console.log(err);
        });
    },
  });

  //! Redirect
  useEffect(() => {
    if (isSuccess) {
      navigate("/login");
    }
  }, [isSuccess, navigate]);

  return (
    <div className="h-screen flex justify-center items-center bg-gray-100">
      <div className="max-w-md w-full p-6 bg-white rounded-lg shadow-md">
        <motion.h2
          variants={containerVariantsTop}
          initial="hidden"
          animate="visible"
          className="text-3xl font-bold text-gray-800 mb-4"
        >
          Register
        </motion.h2>
        {isError && (
          <AlertMessage type="error" message={error?.response?.data?.message} />
        )}
        {isSuccess && <AlertMessage type="success" message={data?.message} />}
        {isPending && <AlertMessage type="loading" message="Registering..." />}

        <form onSubmit={formik.handleSubmit}>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="name"
            >
              Full Name
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="name"
              type="text"
              placeholder="John Doe"
              {...formik.getFieldProps("fullname")}
            />
            {formik.touched.fullname && formik.errors.fullname ? (
              <div className="text-red-500">{formik.errors.fullname}</div>
            ) : null}
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="email"
            >
              Email
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="email"
              type="email"
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
              Password
            </label>
            <div className="relative">
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700  leading-tight focus:outline-none focus:shadow-outline"
                id="password"
                type={showPassword ? "text" : "password"}
                placeholder="******************"
                // onChange={(e) => setPassword(e.target.value)}
                {...formik.getFieldProps("password")}
              />
              {formik.touched.password && formik.errors.password ? (
                <div className="text-red-500">{formik.errors.password}</div>
              ) : null}
              <button
                type="button"
                className="absolute inset-y-0 right-0 px-3 py-2 text-gray-600"
                onClick={togglePasswordVisibility}
              >
                {showPassword ? "Hide" : "Show"}
              </button>
            </div>
          </div>

          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="confirmPassword"
            >
              Confirm Password
            </label>
            <div className="relative">
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700  leading-tight focus:outline-none focus:shadow-outline"
                id="confirmPassword"
                type={showPassword ? "text" : "password"}
                placeholder="******************"
                // onChange={(e) => setPassword(e.target.value)}
                {...formik.getFieldProps("confirmPassword")}
              />
              {formik.touched.confirmPassword &&
              formik.errors.confirmPassword ? (
                <div className="text-red-500">
                  {formik.errors.confirmPassword}
                </div>
              ) : null}
              <button
                type="button"
                className="absolute inset-y-0 right-0 px-3 py-2 text-gray-600"
                onClick={togglePasswordVisibility}
              >
                {showPassword ? "Hide" : "Show"}
              </button>
            </div>
          </div>
          <div className="flex items-center justify-between">
            <motion.button
              variants={containerVariantsLeft}
              initial="hidden"
              animate="visible"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="submit"
            >
              Register
            </motion.button>
            <Link
              to={"/login"}
              className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800"
              href=""
            >
              Already have an account?
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RegisterPage;
