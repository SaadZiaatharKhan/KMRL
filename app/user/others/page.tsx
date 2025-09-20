"use client"

import React, { useState } from "react";

export default function Others() {
  const [activePage, setActivePage] = useState("Dashboard");
  const [activeColor, setActiveColor] = useState("#c3facb");

  const handleNavClick = (page, color) => {
    setActivePage(page);
    setActiveColor(color);
  };

  const renderContent = () => {
    const pageContent = {
      Dashboard: "Dashboard Content",
      Hub: "Hub Content",
      Insights: "Insights Content",
      Chatbot: "Chatbot Content",
    };
    
    const pageDescription = {
      Dashboard: "Welcome to your personal dashboard. This section would display key metrics and activities.",
      Hub: "This is the central Hub for your shared documents and resources.",
      Insights: "This section would provide insights from senior data analysis.",
      Chatbot: "This area would contain the AI Chatbot for quick answers and assistance."
    };

    return (
      <div className="flex flex-col items-center justify-center h-full text-center p-8">
        <h2 className="text-4xl font-bold text-gray-700">{pageContent[activePage]}</h2>
        <p className="mt-4 text-lg text-gray-500 max-w-xl">{pageDescription[activePage]}</p>
      </div>
    );
  };

  const getImagePath = (iconName) => `/images/icons/${iconName}.webp`;

  return (
    <div className="flex flex-col h-screen">
      <div
        className="m-2 p-4 rounded-xl transition-colors duration-500"
        style={{ backgroundColor: activeColor }}
      >
        <p className="text-5xl text-blue-400 p-2 ml-3.5 font-bold">Welcome</p>
        <p className="text-2xl ml-8 text-gray-500 font-medium">Test User</p>
        <p className="text-lg ml-8 text-gray-400 font-medium">
          Software Engineer, IT Department
        </p>
      </div>

      <div className="flex-1 flex justify-center items-center">
        {renderContent()}
      </div>

      <div
        className="fixed flex justify-evenly bottom-0 left-[33.335%] m-2 p-2 rounded-xl w-4/12 transition-colors duration-500"
        style={{ backgroundColor: activeColor }}
      >
        <button
          className={`p-1 m-1 transition-all duration-300 ${
            activePage === "Dashboard" ? "ring-2 ring-white rounded-md" : ""
          }`}
          onClick={() => handleNavClick("Dashboard", "#c3facb")}
        >
          <img src={getImagePath("dashboard")} width={35} height={35} alt="Dashboard" />
        </button>
        <button
          className={`p-1 m-1 transition-all duration-300 ${
            activePage === "Hub" ? "ring-2 ring-white rounded-md" : ""
          }`}
          onClick={() => handleNavClick("Hub", "#f1fac3")}
        >
          <img src={getImagePath("paper")} width={35} height={35} alt="Hub" />
        </button>
        <button
          className={`p-1 m-1 transition-all duration-300 ${
            activePage === "Insights" ? "ring-2 ring-white rounded-md" : ""
          }`}
          onClick={() => handleNavClick("Insights", "#fac3c8")}
        >
          <img src={getImagePath("rating")} width={35} height={35} alt="Senior Insights" />
        </button>
        <button
          className={`p-1 m-1 transition-all duration-300 ${
            activePage === "Chatbot" ? "ring-2 ring-white rounded-md" : ""
          }`}
          onClick={() => handleNavClick("Chatbot", "#c3cefa")}
        >
          <img src={getImagePath("robotics")} width={35} height={35} alt="Chatbot" />
        </button>
      </div>
    </div>
  );
"use client"

}


