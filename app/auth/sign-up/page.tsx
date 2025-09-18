"use client";

import Image from "next/image";
import React, { useState } from "react";

const Sign_Up = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    designation: "",
    customDesignation: "",
    department: "",
    email: "",
    password: "",
  });

  const departmentOptions = [
    "Engineering",
    "Design",
    "Operations",
    "Finance"
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;

    // Special handling when the designation select changes
    if (name === "designation") {
      // If Director selected -> clear department & customDesignation
      if (value === "Director") {
        setFormData((prev) => ({
          ...prev,
          designation: value,
          department: "",
          customDesignation: "",
        }));
        return;
      }

      // If switching away from Others, clear customDesignation
      if (value !== "Others") {
        setFormData((prev) => ({
          ...prev,
          designation: value,
          customDesignation: "",
        }));
        return;
      }

      // If Others selected -> keep department as-is, show customDesignation input
      setFormData((prev) => ({ ...prev, designation: value }));
      return;
    }

    // Normal updates for other fields (including department & customDesignation)
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Submitting:", formData);
    // Replace with your API call / validation as needed
  };

  // Validation depends on designation:
  // - If Director: department NOT required, customDesignation NOT required
  // - If Department Manager: department required
  // - If Others: department required AND customDesignation required
  const isFormValid =
    formData.firstName.trim() &&
    formData.lastName.trim() &&
    formData.designation &&
    formData.email.trim() &&
    formData.password &&
    (formData.designation === "Director"
      ? true
      : formData.department) &&
    (formData.designation === "Others"
      ? formData.customDesignation.trim()
      : true);

  return (
    <div className="h-screen w-full flex">
      {/* LEFT - form side */}
      <div className="w-1/2 relative flex items-center justify-center bg-white overflow-hidden">
        {/* Decorative background image (behind the card) */}
        <div className="absolute inset-0 -z-10">
          <Image
            src="/images/train.png"
            alt="train"
            fill
            style={{ objectFit: "cover" }}
            priority
          />
          <div className="absolute inset-0 bg-black/10" />
        </div>

        {/* Card: fixed max height so whole page fits in one viewport */}
        <div
          className="bg-white/60 backdrop-blur-sm border border-black/10 rounded-2xl
                     w-[75%] max-w-md h-[82vh] max-h-[82vh] p-6 flex flex-col overflow-x-hidden"
        >
          <h2 className="text-3xl font-bold mb-6 text-center text-green-600">
            Sign Up
          </h2>

          {/* Make form area scroll inside card for very small screens */}
          <form
            className="flex-1 overflow-y-auto overflow-x-hidden px-1"
            onSubmit={handleSubmit}
            style={{ scrollbarGutter: "stable" }}
          >
            <div className="mb-4 w-full">
              <label className="text-black p-1 m-1 font-semibold block">
                First Name
              </label>
              <input
                type="text"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                placeholder="Enter your First Name"
                className="w-full p-2 border border-gray-300 rounded-lg text-black m-1"
                required
              />
            </div>

            <div className="mb-4 w-full">
              <label className="text-black p-1 m-1 font-semibold block">
                Last Name
              </label>
              <input
                type="text"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                placeholder="Enter your Last Name"
                className="w-full p-2 border border-gray-300 rounded-lg text-black m-1"
                required
              />
            </div>

            <div className="mb-4 w-full">
              <label className="text-black p-1 m-1 font-semibold block">
                Designation
              </label>
              <select
                name="designation"
                value={formData.designation}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded-lg text-black m-1"
                required
              >
                <option value="">Select Designation</option>
                <option value="Director">Director</option>
                <option value="Department Manager">Department Manager</option>
                <option value="Others">Others</option>
              </select>
            </div>

            {/* Show Department dropdown when designation is NOT Director and a designation is chosen */}
            {formData.designation && formData.designation !== "Director" && (
              <div className="mb-4 w-full">
                <label className="text-black p-1 m-1 font-semibold block">
                  Department
                </label>
                <select
                  name="department"
                  value={formData.department}
                  onChange={handleChange}
                  className="w-full p-2 border border-gray-300 rounded-lg text-black m-1"
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

            {/* If Others selected -> show custom designation text input */}
            {formData.designation === "Others" && (
              <div className="mb-4 w-full">
                <label className="text-black p-1 m-1 font-semibold block">
                  Write your Designation
                </label>
                <input
                  type="text"
                  name="customDesignation"
                  value={formData.customDesignation}
                  onChange={handleChange}
                  placeholder="Enter your Designation (e.g. Research Lead)"
                  className="w-full p-2 border border-gray-300 rounded-lg text-black m-1"
                  required
                />
              </div>
            )}

            <div className="mb-4 w-full">
              <label className="text-black p-1 m-1 font-semibold block">Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter your Email"
                className="w-full p-2 border border-gray-300 rounded-lg text-black m-1"
                required
              />
            </div>

            <div className="mb-4 w-full">
              <label className="text-black p-1 m-1 font-semibold block">
                Password
              </label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Password"
                className="w-full p-2 border border-gray-300 rounded-lg text-black m-1"
                required
              />
            </div>

            <div className="flex justify-center">
              <button
                type="submit"
                className={`rounded-2xl p-2 mt-2 text-white font-medium w-1/2 ${
                  isFormValid
                    ? "bg-[#00C951] border-2"
                    : "bg-gray-400 cursor-not-allowed"
                }`}
                disabled={!isFormValid}
              >
                Sign Up
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* RIGHT - info / image side */}
      <div className="w-1/2 bg-[#00C951] rounded-l-full flex flex-col items-center justify-center text-white h-screen">
        <div className="flex flex-col items-center justify-center gap-4">
          <div className="w-48 h-48 relative">
            <Image src="/images/sign-up.svg" alt="Sign Up" width={300} height={300} />
          </div>
          <p className="text-2xl font-medium">Already Have An Account</p>
          <button
            onClick={() => (window.location.href = "/auth/login")}
            className="text-2xl font-bold underline"
          >
            Login
          </button>
        </div>
      </div>
    </div>
  );
};

export default Sign_Up;
