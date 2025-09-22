import Image from "next/image";
import React, {
  useState,
  useRef,
  useEffect,
  startTransition,
} from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

type Notice = {
  id: string;
  title: string;
  insights: string;
  deadline: string | null; // 🔹 allow null
  severity: "High" | "Medium" | "Low";
  uploadTime: string;
  fileName?: string | null;
  departments: string[];
  authorizedBy?: string | null;
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
    authorizedBy: "CTO Office",
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
    authorizedBy: "HR",
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
    authorizedBy: "Safety Team",
  },
];

const ALL_DEPARTMENTS = ["Engineering", "Design", "Operations", "Finance"];

function getStagingEndpointForFilename(filename: string) {
  const ext = filename.split(".").pop()?.toLowerCase() ?? "";

  const imageExt = ["jpg", "jpeg", "png", "webp"];
  const docExt = ["ppt", "pptx", "doc", "docx", "xls", "xlsx", "pdf"];
  const dataExt = ["txt", "json", "csv", "xml"];

  if (imageExt.includes(ext)) return "/api/summarization/image/staging";
  if (docExt.includes(ext)) return "/api/summarization/document/staging";
  if (dataExt.includes(ext)) return "/api/summarization/dsf/staging";

  return "/api/summarization/document/staging";
}

const Dashboard: React.FC = () => {
  const [show, setShow] = useState(false);
  const [selectedNotice, setSelectedNotice] = useState<Notice | null>(null);
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [notices, setNotices] = useState<Notice[]>(initialNotices);

  // Upload form state
  const [title, setTitle] = useState("");
  const [insights, setInsights] = useState("");
  const [deadline, setDeadline] = useState<string | null>(""); // 🔹 null allowed
  const [severity, setSeverity] = useState<Notice["severity"]>("Low");
  const [fileName, setFileName] = useState<string | null>(null);
  const [departments, setDepartments] = useState<string[]>([]);
  const [authorizedBy, setAuthorizedBy] = useState<string>("");

  // upload state
  const [uploadProgress, setUploadProgress] = useState<number | null>(null);
  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const [uploadedStagingResponse, setUploadedStagingResponse] =
    useState<any>(null);

  const [processing, setProcessing] = useState(false); // 🔹 overlay loader state

  const isAllSelected = departments.length === ALL_DEPARTMENTS.length;

  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleImageClick = () => fileInputRef.current?.click();
  const handleClose = () => setShow(false);
  const handleShow = (notice: Notice) => {
    setSelectedNotice(notice);
    setShow(true);
  };
  const handleShowUpload = () => {
    setTitle("");
    setInsights("");
    setDeadline("");
    setSeverity("Low");
    setFileName(null);
    setDepartments([]);
    setAuthorizedBy("");
    setUploadProgress(null);
    setUploading(false);
    setUploadError(null);
    setUploadedStagingResponse(null);
    setShowUploadModal(true);
  };
  const handleCloseUpload = () => setShowUploadModal(false);

  const memoizedFormData = React.useMemo(
    () => ({
      title,
      insights,
      deadline,
      severity,
      authorizedBy,
      departments,
    }),
    [title, insights, deadline, severity, authorizedBy, departments]
  );

  // 🔹 Null-safe auto-fill for both images and documents
  useEffect(() => {
  if (uploadedStagingResponse) {
    console.log("🔹 RECEIVED STAGING RESPONSE:", uploadedStagingResponse);

    const ex =
      uploadedStagingResponse?.extractedNotice?.extractedNotice ??
      uploadedStagingResponse?.extractedNotice;

    if (ex) {
      setTitle(ex.title ?? "");
      setInsights(ex.insights ?? "");
      setDeadline(ex.deadline ?? "");
      setSeverity(ex.severity ?? "Low");
      setAuthorizedBy(ex.authorizedBy ?? "");

      const depts = Array.isArray(ex.departments)
        ? ex.departments
        : typeof ex.departments === "string"
        ? ex.departments.split(",").map((d) => d.trim())
        : [];
      setDepartments(depts);
    }

    setTimeout(() => {
      startTransition(() => {
        setShowUploadModal(true);
        setProcessing(false);
      });
    }, 100);
  }
}, [uploadedStagingResponse]);


  async function uploadFileToStaging(file: File, endpoint: string) {
    return new Promise<any>((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      const form = new FormData();
      form.append("file", file);

      xhr.open("POST", endpoint);

      xhr.upload.onprogress = (ev) => {
        if (ev.lengthComputable) {
          const percent = Math.round((ev.loaded / ev.total) * 100);
          setUploadProgress(percent);
        }
      };

      xhr.onload = () => {
        setUploading(false);
        setUploadProgress(100);
        if (xhr.status >= 200 && xhr.status < 300) {
          try {
            const resp = xhr.response ? JSON.parse(xhr.response) : null;
            resolve(resp);
          } catch (err) {
            resolve({ raw: xhr.response });
          }
        } else {
          reject(new Error(`Upload failed with status ${xhr.status}`));
        }
      };

      xhr.onerror = () => {
        setUploading(false);
        reject(new Error("Network error during upload"));
      };

      setUploading(true);
      setUploadError(null);
      xhr.send(form);
    });
  }

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    setProcessing(true);
    console.log("🔹 PROCESSING STARTED");
    setUploadError(null);
    setUploadedStagingResponse(null);
    setUploadProgress(null);

    if (!e.target.files || e.target.files.length === 0) {
      setProcessing(false);
      return;
    }

    const file = e.target.files[0];
    setFileName(file.name);

    const stagingEndpoint = getStagingEndpointForFilename(file.name);

    try {
      setUploading(true);

      // 1️⃣ Upload to staging
      const stagingResponse = await uploadFileToStaging(file, stagingEndpoint);
      console.log("🔹 STAGING RESPONSE RECEIVED:", stagingResponse);

      await new Promise((resolve) => setTimeout(resolve, 50)); // small delay

      // 2️⃣ Prepare Gemini processing if needed
      const shouldUseGemini =
        stagingResponse?.routedTo === "summarization" ||
        stagingEndpoint.includes("image") ||
        stagingEndpoint.includes("document");

      if (shouldUseGemini) {
        const form = new FormData();
        form.append("file", file);

        const geminiEndpoint =
        stagingEndpoint.includes("image")
          ? "/api/summarization/image/summarization"
          : stagingEndpoint.includes("document")
          ? "/api/summarization/document/summarization"
          : "/api/summarization/dsf/staging";

        const geminiResp = await fetch(geminiEndpoint, {
          method: "POST",
          body: form,
        });

        const geminiJson = await geminiResp.json();
        console.log("🔹 GEMINI RESPONSE:", geminiJson);

        if (geminiJson.success && geminiJson.extractedNotice) {
          setUploadedStagingResponse({
            extractedNotice: geminiJson.extractedNotice,
          });
        } else {
          console.warn("Gemini returned no extractable notice:", geminiJson);
          setUploadedStagingResponse(null);
          setProcessing(false);
        }
      } else {
        setUploadedStagingResponse(null);
        setProcessing(false);
      }
    } catch (err: any) {
      console.error("Upload/Gemini error:", err);
      setUploadError(err?.message ?? "Upload failed");
      setProcessing(false);
    } finally {
      setUploading(false);
      setUploadProgress(null);
      if (fileInputRef.current) fileInputRef.current.value = "";
    }
  };

  const toggleDepartment = (dept: string) => {
    setDepartments((prev) =>
      prev.includes(dept) ? prev.filter((d) => d !== dept) : [...prev, dept]
    );
  };
  const toggleAllDepartments = () => {
    setDepartments((prev) =>
      prev.length === ALL_DEPARTMENTS.length ? [] : [...ALL_DEPARTMENTS]
    );
  };

  const handleUploadSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const now = new Date();
    const uploadTime = now.toLocaleString();
    const newNotice: Notice = {
      id: String(Math.floor(Math.random() * 1000000)),
      title: title || "Untitled Notice",
      insights: insights || "",
      deadline: deadline ?? "", // 🔹 keep empty string if null
      severity,
      uploadTime,
      fileName,
      departments: [...departments],
      authorizedBy: authorizedBy || null,
    };

    setNotices((prev) => [newNotice, ...prev]);
    setTitle("");
    setInsights("");
    setDeadline("");
    setSeverity("Low");
    setFileName(null);
    setDepartments([]);
    setAuthorizedBy("");
    setUploadProgress(null);
    setUploading(false);
    setUploadError(null);
    setShowUploadModal(false);
  };

  return (
    <div className="flex flex-col justify-center items-center w-full p-1">
      {/* 🔹 Fullscreen Processing Overlay */}
      {processing && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[9999]">
          <div className="bg-white p-4 rounded-lg flex flex-col items-center">
            <div className="loader border-4 border-blue-500 border-t-transparent rounded-full w-12 h-12 animate-spin mb-3"></div>
            <p className="text-lg font-semibold">Processing...</p>
          </div>
        </div>
      )}

      <p className="text-3xl font-bold text-black m-1">Dashboard</p>

      <div
        className="flex justify-between items-center p-1 w-full"
        style={{ maxWidth: 1100 }}
      >
<<<<<<< HEAD
        <button style={{borderRadius:"20px",padding:"10px 20px"}} className="rounded-2xl bg-green-500 text-white font-bold py-2 px-4 ">
=======
        <button
          className="bg-green-500 text-white border-2 border-white font-bold py-0.5 px-4 rounded-2xl "
          onClick={handleShowUpload}
        >
>>>>>>> 5c8e5e4dc481159095cb6105d57ce7eb9ff991e9
          Upload Notice
        </button>
        <input
          type="text"
          placeholder="Search"
          className="border-2 border-gray-400 rounded-2xl py-2 px-4"
        />
      </div>

      <div
        className="w-10/12 h-auto border-2 border-gray-300 rounded-lg m-6 p-4"
        style={{ maxWidth: 1100 }}
      >
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
                <strong>Authorized by:</strong>{" "}
                {selectedNotice.authorizedBy ?? "—"}
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
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleFileChange}
                  className="hidden"
                />
                {fileName && (
                  <p className="mt-1 text-sm">Selected: {fileName}</p>
                )}

                {uploading && uploadProgress != null && (
                  <div className="w-full mt-2">
                    <div className="text-sm">Uploading: {uploadProgress}%</div>
                    <div className="w-full bg-gray-200 rounded h-2 mt-1">
                      <div
                        style={{ width: `${uploadProgress}%` }}
                        className="h-2 rounded bg-blue-500"
                      />
                    </div>
                  </div>
                )}

                {uploadError && <p className="text-red-500">{uploadError}</p>}
              </div>

              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Title"
                className="w-full border px-2 py-1 rounded"
                required
              />

              <textarea
                value={insights}
                onChange={(e) => setInsights(e.target.value)}
                placeholder="Actionable Insights"
                className="w-full border px-2 py-1 rounded"
                required
              />

              <input
                type="date"
                value={deadline}
                onChange={(e) => setDeadline(e.target.value)}
                className="w-full border px-2 py-1 rounded"
                required
              />

              <select
                value={severity}
                onChange={(e) =>
                  setSeverity(e.target.value as Notice["severity"])
                }
                className="w-full border px-2 py-1 rounded"
              >
                <option value="High">High</option>
                <option value="Medium">Medium</option>
                <option value="Low">Low</option>
              </select>

              <input
                type="text"
                value={authorizedBy}
                onChange={(e) => setAuthorizedBy(e.target.value)}
                placeholder="Authorized By"
                className="w-full border px-2 py-1 rounded"
              />

              <div className="flex flex-wrap gap-2">
                <button
                  type="button"
                  onClick={toggleAllDepartments}
                  className={`px-2 py-1 border rounded ${
                    isAllSelected ? "bg-blue-500 text-white" : "bg-gray-100"
                  }`}
                >
                  Select All
                </button>

                {ALL_DEPARTMENTS.map((dept) => (
                  <button
                    type="button"
                    key={dept}
                    onClick={() => toggleDepartment(dept)}
                    className={`px-2 py-1 border rounded ${
                      departments.includes(dept)
                        ? "bg-blue-500 text-white"
                        : "bg-gray-100"
                    }`}
                  >
                    {dept}
                  </button>
                ))}
              </div>
            </div>
          </Modal.Body>

          <Modal.Footer>
            <Button variant="secondary" onClick={handleCloseUpload}>
              Close
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
