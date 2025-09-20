import Image from "next/image";
import React, { useState, useRef } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

type Notice = {
  id: string;
  title: string;
  insights: string;
  deadline: string;
  severity: "High" | "Medium" | "Low";
  uploadTime: string;
  fileName?: string | null;
  departments: string[]; // added departments here
};

const initialNotices: Notice[] = [
  {
    id: "001",
    title: "System Update",
    insights: "Apply patch before downtime",
    deadline: "2025-09-25",
    severity: "High",
    uploadTime: "2025-09-20 10:30 AM",
    fileName: null,
    departments: ["Engineering", "Operations"],
  },
  {
    id: "002",
    title: "Meeting Schedule",
    insights: "Prepare agenda",
    deadline: "2025-09-30",
    severity: "Medium",
    uploadTime: "2025-09-19 04:15 PM",
    fileName: null,
    departments: ["Design"],
  },
  {
    id: "003",
    title: "Safety Drill",
    insights: "Inform employees",
    deadline: "2025-10-05",
    severity: "Low",
    uploadTime: "2025-09-18 09:00 AM",
    fileName: null,
    departments: ["Operations", "Finance"],
  },
];

const ALL_DEPARTMENTS = ["Engineering", "Design", "Operations", "Finance"];

const Dashboard: React.FC = () => {
  const [show, setShow] = useState(false);
  const [selectedNotice, setSelectedNotice] = useState<Notice | null>(null);

  const [showUploadModal, setShowUploadModal] = useState(false);

  const [notices, setNotices] = useState<Notice[]>(initialNotices);

  // Upload form state
  const [title, setTitle] = useState("");
  const [insights, setInsights] = useState("");
  const [deadline, setDeadline] = useState("");
  const [severity, setSeverity] = useState<Notice["severity"]>("Low");
  const [fileName, setFileName] = useState<string | null>(null);
  const [departments, setDepartments] = useState<string[]>([]);

  // file input ref
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleImageClick = () => {
    fileInputRef.current?.click();
  };

  const handleClose = () => setShow(false);
  const handleShow = (notice: Notice) => {
    setSelectedNotice(notice);
    setShow(true);
  };

  const handleShowUpload = () => {
    // reset form
    setTitle("");
    setInsights("");
    setDeadline("");
    setSeverity("Low");
    setFileName(null);
    setDepartments([]); // reset departments
    setShowUploadModal(true);
  };

  const handleCloseUpload = () => setShowUploadModal(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setFileName(e.target.files[0].name);
    } else {
      setFileName(null);
    }
  };

  const toggleDepartment = (dept: string) => {
    setDepartments((prev) =>
      prev.includes(dept) ? prev.filter((d) => d !== dept) : [...prev, dept]
    );
  };

  const handleUploadSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const now = new Date();
    const uploadTime = now.toLocaleString(); // simple human readable
    const newNotice: Notice = {
      id: String(Math.floor(Math.random() * 1000000)), // simple id
      title: title || "Untitled Notice",
      insights: insights || "",
      deadline: deadline || "",
      severity,
      uploadTime,
      fileName,
      departments: [...departments],
    };

    setNotices((prev) => [newNotice, ...prev]);
    setShowUploadModal(false);
  };

  return (
    <div className="flex flex-col justify-center items-center w-full p-4">
      <p className="text-3xl font-bold text-black m-2">Dashboard</p>

      {/* Top Bar */}
      <div
        className="flex justify-between items-center m-2 p-1 w-full"
        style={{ maxWidth: 1100 }}
      >
        <button
          className="bg-green-500 text-white border-2 border-white font-bold py-2 px-4 rounded-2xl "
          onClick={handleShowUpload}
        >
          Upload Notice
        </button>
        <input
          type="text"
          placeholder="Search"
          className="border-2 border-gray-400 rounded-2xl py-2 px-4"
        />
      </div>

      {/* Grid Table */}
      <div
        className="w-10/12 h-auto border-2 border-gray-300 rounded-lg m-6 p-4"
        style={{ maxWidth: 1100 }}
      >
        {/* Header Row */}
        <div className="grid grid-cols-8 gap-4 bg-gray-200 font-semibold p-2 rounded-lg">
          <div>Notice No.</div>
          <div>Title</div>
          <div>Actionable Insights</div>
          <div>Deadline</div>
          <div>Severity</div>
          <div>Departments</div>
          <div>Upload Time</div>
          <div>Action</div>
        </div>

        {/* Rows */}
        {notices.map((notice) => (
          <div
            key={notice.id}
            className="grid grid-cols-8 gap-4 p-2 border-b items-center"
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
            <div className="text-sm">
              {notice.departments.length > 0
                ? notice.departments.join(", ")
                : "—"}
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

      {/* View Info Modal */}
      <Modal show={show} onHide={handleClose} centered>
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
                <strong>Departments:</strong>{" "}
                {selectedNotice.departments.length > 0
                  ? selectedNotice.departments.join(", ")
                  : "—"}
              </p>
              <p>
                <strong>Upload Time:</strong> {selectedNotice.uploadTime}
              </p>
              {selectedNotice.fileName && (
                <p>
                  <strong>File:</strong> {selectedNotice.fileName}
                </p>
              )}
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

      {/* Upload Modal */}
      <Modal show={showUploadModal} onHide={handleCloseUpload} centered>
        <Modal.Header closeButton>
          <Modal.Title>Upload Notice</Modal.Title>
        </Modal.Header>
        <form onSubmit={handleUploadSubmit}>
          <Modal.Body>
            <div className="space-y-3">
              {/* File upload trigger */}
              <div className="flex flex-col items-center">
                <div
                  className="cursor-pointer inline-block"
                  onClick={handleImageClick}
                >
                  <Image
                    src="/images/icons/upload.png"
                    width={50}
                    height={50}
                    alt="Upload"
                  />
                </div>
                {/* Hidden file input */}
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleFileChange}
                  className="hidden"
                />
                {fileName && (
                  <p className="mt-1 text-sm">Selected: {fileName}</p>
                )}
              </div>

              <div>
                <label className="block font-semibold">Title</label>
                <input
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full border p-2 rounded"
                  required
                />
              </div>

              <div>
                <label className="block font-semibold">
                  Actionable Insights
                </label>
                <textarea
                  value={insights}
                  onChange={(e) => setInsights(e.target.value)}
                  className="w-full border p-2 rounded"
                  rows={3}
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold">Deadline</label>
                  <input
                    type="date"
                    value={deadline}
                    onChange={(e) => setDeadline(e.target.value)}
                    className="w-full border p-2 rounded"
                  />
                </div>

                <div>
                  <label className="block font-semibold">Severity</label>
                  <select
                    value={severity}
                    onChange={(e) =>
                      setSeverity(e.target.value as Notice["severity"])
                    }
                    className="w-full border p-2 rounded"
                  >
                    <option value="Low">Low</option>
                    <option value="Medium">Medium</option>
                    <option value="High">High</option>
                  </select>
                </div>
              </div>

              {/* Department selector as toggle buttons */}
              <div>
                <label className="block font-semibold mb-2">To Department</label>
                <div className="flex flex-wrap gap-3">
                  {ALL_DEPARTMENTS.map((dept) => {
                    const isSelected = departments.includes(dept);
                    return (
                      <button
                        key={dept}
                        type="button"
                        onClick={() => toggleDepartment(dept)}
                        className={`p-1 m-1 rounded-lg border font-medium transition focus:outline-none ${
                          isSelected
                            ? "bg-blue-500 text-white border-blue-600"
                            : "bg-gray-100 text-gray-700 border-gray-300 hover:bg-gray-200"
                        }`}
                      >
                        {dept}
                      </button>
                    );
                  })}
                </div>

                {departments.length > 0 && (
                  <p className="mt-2 text-sm text-gray-600">
                    Selected: {departments.join(", ")}
                  </p>
                )}
              </div>
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleCloseUpload}>
              Cancel
            </Button>
            <Button variant="primary" type="submit">
              Upload
            </Button>
          </Modal.Footer>
        </form>
      </Modal>
    </div>
  );
};

export default Dashboard;
