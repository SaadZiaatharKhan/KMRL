import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

const Dashboard = () => {
  const [show, setShow] = useState(false);
  const [selectedNotice, setSelectedNotice] = useState<any>(null);

  const handleClose = () => setShow(false);
  const handleShow = (notice: any) => {
    setSelectedNotice(notice);
    setShow(true);
  };

  // Example data
  const notices = [
    {
      id: "001",
      title: "System Update",
      insights: "Apply patch before downtime",
      deadline: "2025-09-25",
      severity: "High",
      uploadTime: "2025-09-20 10:30 AM",
    },
    {
      id: "002",
      title: "Meeting Schedule",
      insights: "Prepare agenda",
      deadline: "2025-09-30",
      severity: "Medium",
      uploadTime: "2025-09-19 04:15 PM",
    },
    {
      id: "003",
      title: "Safety Drill",
      insights: "Inform employees",
      deadline: "2025-10-05",
      severity: "Low",
      uploadTime: "2025-09-18 09:00 AM",
    },
  ];

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
        <div className="grid grid-cols-7 gap-4 bg-gray-200 font-semibold p-2 rounded-lg">
          <div>Notice No.</div>
          <div>Title</div>
          <div>Actionable Insights</div>
          <div>Deadline</div>
          <div>Severity</div>
          <div>Upload Time</div>
          <div>Action</div>
        </div>

        {/* Rows */}
        {notices.map((notice) => (
          <div
            key={notice.id}
            className="grid grid-cols-7 gap-4 p-2 border-b items-center"
          >
            <div>{notice.id}</div>
            <div>{notice.title}</div>
            <div>{notice.insights}</div>
            <div>{notice.deadline}</div>
            <div
              className={`font-bold ${
                notice.severity === "High"
                  ? "text-red-500"
                  : notice.severity === "Medium"
                  ? "text-yellow-500"
                  : "text-green-600"
              }`}
            >
              {notice.severity}
            </div>
            <div>{notice.uploadTime}</div>
            <div>
              <Button
                variant="info"
                size="sm"
                onClick={() => handleShow(notice)}
              >
                View Info
              </Button>
            </div>
          </div>
        ))}
      </div>

      {/* Modal */}
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Notice Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedNotice ? (
            <div className="space-y-2">
              <p>
                <strong>Notice No:</strong> {selectedNotice.id}
              </p>
              <p>
                <strong>Title:</strong> {selectedNotice.title}
              </p>
              <p>
                <strong>Actionable Insights:</strong> {selectedNotice.insights}
              </p>
              <p>
                <strong>Deadline:</strong> {selectedNotice.deadline}
              </p>
              <p>
                <strong>Severity:</strong>{" "}
                <span
                  className={`font-bold ${
                    selectedNotice.severity === "High"
                      ? "text-red-500"
                      : selectedNotice.severity === "Medium"
                      ? "text-yellow-500"
                      : "text-green-600"
                  }`}
                >
                  {selectedNotice.severity}
                </span>
              </p>
              <p>
                <strong>Upload Time:</strong> {selectedNotice.uploadTime}
              </p>
            </div>
          ) : (
            <p>No notice selected</p>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default Dashboard;
