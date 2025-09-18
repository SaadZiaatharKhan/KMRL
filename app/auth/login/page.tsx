"use client";

import Image from "next/image";
import React, { useState } from "react";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Do login logic here (call API, Supabase, etc.)
    console.log("Login data:", formData);
  };

  return (
    <div className="h-screen w-full flex">
      {/* Left side */}
      <div
        dir="rtl"
        className="w-3/6 bg-green-500 rounded-r-full flex flex-col justify-center items-center"
      >
        <Image src="/images/login.svg" alt="Login" width={300} height={300} />
        <p className="text-2xl font-medium text-white">? New User</p>
        <button
          onClick={() => (window.location.href = "/auth/sign-up")}
          className="text-2xl font-bold text-white mt-2"
        >
          Sign Up
        </button>
      </div>

      {/* Right side (form) */}
      <div className="w-3/6 bg-white flex flex-col justify-center items-center">
        <form
          onSubmit={handleSubmit}
          className="w-full max-w-sm p-6 rounded-lg shadow-md"
        >
          <h2 className="text-3xl font-bold mb-6 text-center text-green-600">
            Login
          </h2>

          <div className="mb-4">
            <label className="block text-gray-700 font-semibold mb-1">
              Email
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your Email"
              className="w-full p-2 border border-gray-300 rounded-lg text-black"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 font-semibold mb-1">
              Password
            </label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter your Password"
              className="w-full p-2 border border-gray-300 rounded-lg text-black"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-green-500 text-white py-2 px-4 rounded-lg hover:bg-green-600 transition"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
