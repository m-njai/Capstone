const express = require("express");
const multer = require("multer");
const { v4: uuidv4 } = require("uuid");
const { ensureAuth, ensureRole } = require("../middleware/auth");
const PDFDocument = require('pdfkit');
const router = express.Router();

// In-memory storage for demonstration purposes
let documents = [];
let nextCommentId = 1;

const storage = multer.diskStorage({
  destination: "./uploads/compliance_docs/",
  filename: (req, file, cb) => cb(null, uuidv4() + "-" + file.originalname),
});
const upload = multer({ storage });

// Helper: Find document by ID
function findDocument(docId) {
  return documents.find(doc => doc.id === docId);
}

// 1. Upload a Compliance Document
router.post("/upload", ensureAuth, ensureRole(['Admin', 'Builder', 'Supplier']), upload.single("file"), (req, res) => {
  const { projectId, docType, expiryDate, fscPercent, greenStarRating } = req.body;
  const newDoc = {
    id: uuidv4(),
    filePath: req.file.path,
    projectId,
    docType,
    expiryDate,
    status: "Submitted",
    fscPercent,
    greenStarRating,
    uploadedAt: new Date().toISOString(),
    uploadedBy: req.user.id,
    comments: []
  };
  documents.push(newDoc);
  res.status(201).json({ message: "Document uploaded", document: newDoc });
});

// 2. Get List of Compliance Documents
router.get("/", ensureAuth, ensureRole(['Admin', 'Builder', 'Supplier', 'Compliance Officer']), (req, res) => {
  const user = req.user;
  let visibleDocs;

  if (user.role === 'Admin' || user.role === 'Compliance Officer') {
    visibleDocs = documents;
  } else if (user.role === 'Supplier') {
    visibleDocs = documents.filter(doc => doc.uploadedBy === user.id);
  } else {
    visibleDocs = documents;
  }
  res.json(visibleDocs);
});

// 3. Update Document Status
router.put("/:id/status", ensureAuth, ensureRole(['Admin', 'Compliance Officer']), (req, res) => {
  const { id } = req.params;
  const { status } = req.body;
  const doc = findDocument(id);
  if (!doc) return res.status(404).json({ error: "Document not found" });
  if (!['Under Review', 'Approved', 'Rejected'].includes(status)) {
    return res.status(400).json({ error: "Invalid status value" });
  }
  doc.status = status;
  res.json({ message: "Document status updated", document: doc });
});

// 4. Add a Comment
router.post("/:id/comments", ensureAuth, ensureRole(['Admin', 'Compliance Officer']), (req, res) => {
  const { id } = req.params;
  const { text } = req.body;
  const doc = findDocument(id);
  if (!doc) return res.status(404).json({ error: "Document not found" });

  const newComment = {
    commentId: nextCommentId++,
    author: req.user.id,
    authorRole: req.user.role,
    text,
    date: new Date().toISOString()
  };
  doc.comments.push(newComment);
  res.status(201).json({ message: "Comment added", comment: newComment });
});

// 5. Export Reports (CSV or PDF)
router.get("/export/:format", ensureAuth, ensureRole(['Admin', 'Compliance Officer']), (req, res) => {
  const format = req.params.format;
  const fields = ['Project Name', 'Document Type', 'Expiry Date', 'Status', 'FSC %', 'Green Star Rating'];

  if (format === 'csv') {
    res.setHeader('Content-Type', 'text/csv');
    res.setHeader('Content-Disposition', 'attachment; filename=compliance_report.csv');
    const header = fields.join(',') + '\n';
    const rows = documents.map(doc => `${doc.projectId},${doc.docType},${doc.expiryDate},${doc.status},${doc.fscPercent},${doc.greenStarRating}`).join('\n');
    res.send(header + rows);
  } else if (format === 'pdf') {
    const doc = new PDFDocument();
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', 'attachment; filename=compliance_report.pdf');
    doc.pipe(res);
    doc.fontSize(14).text("Compliance Report", { align: 'center' });
    doc.moveDown();
    documents.forEach(d => {
      const line = `${d.projectId} | ${d.docType} | ${d.expiryDate} | ${d.status} | ${d.fscPercent}% | ${d.greenStarRating}`;
      doc.text(line);
    });
    doc.end();
  } else {
    res.status(400).json({ error: "Invalid format. Use 'csv' or 'pdf'." });
  }
});

module.exports = router;
