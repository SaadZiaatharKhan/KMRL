import React from "react";

const Dashboard = () => {
  return (
    <div className="flex flex-col justify-center items-center w-full">
      <p className="text-3xl font-bold text-black">Dashboard</p>

      {/* Top Bar */}
      <div
        className="flex justify-between items-center mx-2 p-1"
        style={{ width: "calc(100vw - 1rem)" }}
      >
        <button className="bg-green-500 text-white font-bold py-2 px-4 rounded-2xl">
          Upload Notice
        </button>
        <input
          type="text"
          placeholder="Search"
          className="border-2 border-gray-400 rounded-2xl py-2 px-4"
        />
      </div>

      {/* Grid Table */}
      <div className="w-10/12 h-auto border-2 border-gray-300 rounded-lg m-6 p-4">
        {/* Header Row */}
        <div className="grid grid-cols-6 gap-4 bg-gray-200 font-semibold p-2 rounded-lg">
          <div>Notice No.</div>
          <div>Title</div>
          <div>Actionable Insights</div>
          <div>Deadline</div>
          <div>Severity</div>
          <div>Upload Time</div>
        </div>

        {/* Example Rows */}
        <div className="grid grid-cols-6 gap-4 p-2 border-b">
          <div>001</div>
          <div>System Update</div>
          <div>Apply patch before downtime</div>
          <div>2025-09-25</div>
          <div className="text-red-500 font-bold">High</div>
          <div>2025-09-20 10:30 AM</div>
        </div>

        <div className="grid grid-cols-6 gap-4 p-2 border-b">
          <div>002</div>
          <div>Meeting Schedule</div>
          <div>Prepare agenda</div>
          <div>2025-09-30</div>
          <div className="text-yellow-500 font-bold">Medium</div>
          <div>2025-09-19 04:15 PM</div>
        </div>

        <div className="grid grid-cols-6 gap-4 p-2">
          <div>003</div>
          <div>Safety Drill</div>
          <div>Inform employees</div>
          <div>2025-10-05</div>
          <div className="text-green-600 font-bold">Low</div>
          <div>2025-09-18 09:00 AM</div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
