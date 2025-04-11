import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import {
  UploadCloud,
  ClipboardCheck,
  Leaf,
  FileWarning,
  FileText,
  ListChecks,
  FileUp,
} from "lucide-react";

import ComplianceUpload from "../../components/ComplianceUpload";
import ComplianceChecklist from "../../components/ComplianceChecklist";
import ComplaintForm from "../../components/ComplaintForm";
import ComplaintLog from "../../components/ComplaintLog";
import DocumentList from "../../components/DocumentList";
import DocumentUpload from "../../components/DocumentUpload";
import DocumentReview from "../../components/DocumentReview";

import photoHero1 from "../../photos/photo12.jpg";
import photoHero2 from "../../photos/photo24.jpg";

const tabs = [
  { key: "upload", label: "Upload Docs", icon: <UploadCloud size={16} /> },
  { key: "checklist", label: "Checklist", icon: <ClipboardCheck size={16} /> },
  { key: "score", label: "Sustainability", icon: <Leaf size={16} /> },
  { key: "complaints", label: "Complaints", icon: <FileWarning size={16} /> },
  { key: "doclist", label: "Document List", icon: <ListChecks size={16} /> },
  { key: "docupload", label: "Document Upload", icon: <FileUp size={16} /> },
  { key: "docreview", label: "Review Docs", icon: <FileText size={16} /> },
];

const ComplianceDashboard = ({ projectId: propProjectId }) => {
  const { projectId: routeProjectId } = useParams();
  const navigate = useNavigate();
  const projectId = propProjectId || routeProjectId;

  const [activeTab, setActiveTab] = useState("upload");
  const [documents, setDocuments] = useState([]);
  const [score, setScore] = useState(null);
  const [currentHero, setCurrentHero] = useState(0);
  const heroImages = [photoHero1, photoHero2];

  useEffect(() => {
    const fetchDocs = async () => {
      try {
        const res = await axios.get("/api/compliance");
        setDocuments(res.data.documents || []);
      } catch (err) {
        console.error("Error fetching compliance documents:", err);
      }
    };

    const fetchSustainabilityScore = async () => {
      if (!projectId) return;
      try {
        const res = await axios.get(`/api/sustainability/score/${projectId}`);
        setScore(res.data);
      } catch (err) {
        console.error("Error fetching sustainability score:", err);
        setScore(null);
      }
    };

    fetchDocs();
    fetchSustainabilityScore();
  }, [projectId]);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentHero((prev) => (prev + 1) % heroImages.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const exportCompliancePDF = () => {
    const doc = new jsPDF();
    doc.setFontSize(16);
    doc.text("Compliance Document Summary", 14, 20);
    doc.setFontSize(12);
    autoTable(doc, {
      startY: 30,
      head: [["Title", "Type", "Status"]],
      body: documents.map((doc) => [doc.title, doc.type || "N/A", doc.status]),
    });
    doc.save("compliance_summary.pdf");
  };

  return (
    <div className="min-h-screen bg-gray-50 text-gray-800 flex flex-col">
      <header className="bg-gray-900 text-white px-6 py-4 flex justify-between items-center shadow-md">
        <div className="flex items-center gap-3">
          <div className="bg-blue-300 text-gray-900 font-bold rounded-full w-10 h-10 flex items-center justify-center text-lg">SG</div>
          <h1 className="text-xl font-semibold">SmartGrain Systems</h1>
        </div>
        <div>
          <button onClick={() => navigate("/dashboard")} className="text-blue-300 border border-blue-300 px-3 py-1 rounded mr-3 hover:bg-blue-300 hover:text-gray-900 transition">Home</button>
        </div>
      </header>

      {/* Hero Banner */}
      <section
        style={{
          padding: "5rem 2rem",
          textAlign: "center",
          backgroundImage: `url(${heroImages[currentHero]})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          color: "#fff",
          transition: "background-image 1s ease-in-out",
          position: "relative",
          animation: "fadeIn 1.5s ease-in",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            zIndex: 1,
          }}
        />
        <div
          style={{
            position: "relative",
            zIndex: 2,
            animation: "slideUp 1s ease-out",
          }}
        >
          <h2 style={{ fontSize: "2.25rem", fontWeight: 600 }}>
            Compliance & Sustainability Management
          </h2>
          <p style={{ fontSize: "1.1rem", maxWidth: "650px", margin: "1rem auto" }}>
            Upload permits, monitor green ratings, and track governance in real-time.
          </p>
        </div>
      </section>

      <main className="flex-1 px-6 py-10 max-w-6xl mx-auto w-full">
        <h2 className="text-2xl font-semibold mb-6">Compliance & Sustainability Dashboard</h2>

        <div className="flex gap-3 flex-wrap mb-6">
          {tabs.map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`flex items-center gap-2 px-4 py-2 rounded text-sm font-medium transition shadow-sm ${
                activeTab === tab.key ? "bg-emerald-800 text-white" : "bg-gray-200 text-gray-800"
              }`}
            >
              {tab.icon}
              {tab.label}
            </button>
          ))}
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            {activeTab === "upload" && (
              <>
                <div className="grid md:grid-cols-2 gap-6">
                  <ComplianceUpload projectId={projectId} />
                  <ComplianceChecklist documents={documents} />
                </div>

                <div className="mt-6 bg-white shadow rounded p-4">
                  <h3 className="text-lg font-semibold mb-2 text-gray-800">Permit Approval Progress</h3>
                  {documents.length === 0 ? (
                    <p className="text-sm text-gray-500">No documents submitted yet.</p>
                  ) : (
                    documents.map((doc) => {
                      const progress =
                        doc.status === "approved" ? 100 :
                        doc.status === "in review" ? 60 : 20;
                      return (
                        <div key={doc._id} className="mb-3">
                          <div className="flex justify-between mb-1">
                            <span className="text-sm text-gray-700">{doc.title}</span>
                            <span className={`text-xs font-semibold px-2 py-1 rounded-full ${
                              doc.status === "approved" ? "bg-green-100 text-green-700" :
                              doc.status === "in review" ? "bg-yellow-100 text-yellow-700" :
                              "bg-red-100 text-red-700"
                            }`}>
                              {doc.status.toUpperCase()}
                            </span>
                          </div>
                          <div className="w-full bg-gray-200 rounded h-2 overflow-hidden">
                            <div
                              className={`${progress === 100 ? "bg-green-500" : progress === 60 ? "bg-yellow-400" : "bg-red-400"}`}
                              style={{ width: `${progress}%`, height: "100%", transition: "width 0.3s ease" }}
                            ></div>
                          </div>
                        </div>
                      );
                    })
                  )}

                  <button
                    onClick={exportCompliancePDF}
                    className="mt-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
                  >
                    Export Compliance Summary (PDF)
                  </button>
                </div>
              </>
            )}

            {activeTab === "score" && (
              <div className="mt-4 bg-green-100 p-4 rounded-md">
                {!projectId ? (
                  <p className="text-red-600">Missing project ID.</p>
                ) : !score ? (
                  <p>Loading sustainability data...</p>
                ) : (
                  <div>
                    <h3 className="text-lg font-semibold text-emerald-800 mb-2">Sustainability Score</h3>
                    <p>Total Material Orders: {score.total}</p>
                    <p>FSC-Certified Orders: {score.fscCertified}</p>
                    <p>FSC Percentage: {score.fscPercent.toFixed(1)}%</p>
                    <h4 className="mt-2 font-bold">Rating: {score.rating}</h4>
                  </div>
                )}
              </div>
            )}

            {activeTab === "complaints" && (
              <div className="grid md:grid-cols-2 gap-6">
                <ComplaintForm projectId={projectId} />
                <ComplaintLog />
              </div>
            )}

            {activeTab === "doclist" && <DocumentList />}
            {activeTab === "docupload" && <DocumentUpload />}
            {activeTab === "docreview" && <DocumentReview />}
          </motion.div>
        </AnimatePresence>
      </main>

      <footer className="bg-gray-900 text-white py-6 text-center mt-auto">
        <p className="text-sm">&copy; {new Date().getFullYear()} SmartGrain Systems</p>
        <div className="mt-2 text-sm space-x-4">
          <a href="/privacy" className="text-blue-300 hover:underline">Privacy</a>
          <a href="/terms" className="text-blue-300 hover:underline">Terms</a>
        </div>
      </footer>
    </div>
  );
};

export default ComplianceDashboard;
