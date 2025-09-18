"use client";

import Image from "next/image";
import React, { useState } from "react";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    designation: "",
    department: "",
  });

  const departmentOptions = [
    "HR",
    "Finance",
    "IT",
    "Operations",
    "Marketing",
    "Sales",
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;

    // Special handling when designation changes
    if (name === "designation") {
      // If Director selected -> clear department
      if (value === "Director") {
        setFormData((prev) => ({
          ...prev,
          designation: value,
          department: "",
        }));
        return;
      }
      // otherwise just set designation (department may be chosen separately)
      setFormData((prev) => ({ ...prev, designation: value }));
      return;
    }

    // Regular update for email, password, department
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // login logic here - e.g. call API, supabase, etc.
    // maybe send { email, password, designation, department }
    console.log("Login data:", formData);
  };

  // Disable button if email/password/designation missing OR if designation != Director and department missing
  const isDisabled =
    !formData.email ||
    !formData.password ||
    !formData.designation ||
    (formData.designation !== "Director" ? !formData.department : false);

  return (
    <div className="h-screen w-full flex">
      {/* Left side */}
      <div
        dir="rtl"
        className="w-3/6 bg-green-500 rounded-r-full flex flex-col justify-center items-center"
      >
        <div className="w-48 h-48 relative">
          <Image src="/images/login.svg" alt="Login" fill style={{ objectFit: "contain" }} />
        </div>
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
          <h2 className="text-3xl font-bold mb-4 text-center text-green-600">
            Login
          </h2>

          {/* Designation */}
          <div className="mb-4">
            <label className="block text-gray-700 font-semibold mb-1">
              Designation
            </label>
            <select
              name="designation"
              value={formData.designation}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-lg text-black"
              required
            >
              <option value="">Select Designation</option>
              <option value="Director">Director</option>
              <option value="Department Manager">Department Manager</option>
              <option value="Others">Others</option>
            </select>
          </div>

          {/* Department (only when designation is chosen and not Director) */}
          {formData.designation && formData.designation !== "Director" && (
            <div className="mb-4">
              <label className="block text-gray-700 font-semibold mb-1">
                Department
              </label>
              <select
                name="department"
                value={formData.department}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded-lg text-black"
                required
              >
                <option value="">Select Department</option>
                {departmentOptions.map((dept) => (
                  <option key={dept} value={dept}>
                    {dept}
                  </option>
                ))}
              </select>
            </div>
          )}

          {/* Email */}
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

          {/* Password */}
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

          {/* Login button styled like your SignUp style */}
          <div className="flex justify-center">
            <button
              type="submit"
              className={`rounded-2xl p-2 mt-2 text-white font-medium w-1/2 ${
                !isDisabled ? "bg-[#00C951] border-2" : "bg-gray-400 cursor-not-allowed"
              }`}
              disabled={isDisabled}
            >
              Login
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
