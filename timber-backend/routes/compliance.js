// routes/compliance.js
const express = require("express");
const multer = require("multer");
const { v4: uuidv4 } = require("uuid");
const { ensureAuth, ensureRole } = require("../middleware/auth");
const {
  uploadComplianceDocument,
  getComplianceDocuments,
  updateDocumentStatus,
  addComplianceComment,
  exportComplianceReport
} = require("../controllers/complianceController");

const router = express.Router();

const storage = multer.diskStorage({
  destination: "./uploads/compliance_docs/",
  filename: (req, file, cb) => cb(null, uuidv4() + "-" + file.originalname),
});
const upload = multer({ storage });

router.post("/upload", ensureAuth, ensureRole(['Admin', 'Builder', 'Supplier']), upload.single("file"), uploadComplianceDocument);
router.get("/", ensureAuth, ensureRole(['Admin', 'Builder', 'Supplier', 'Compliance Officer']), getComplianceDocuments);
router.put("/:id/status", ensureAuth, ensureRole(['Admin', 'Compliance Officer']), updateDocumentStatus);
router.post("/:id/comments", ensureAuth, ensureRole(['Admin', 'Compliance Officer']), addComplianceComment);
router.get("/export/:format", ensureAuth, ensureRole(['Admin', 'Compliance Officer']), exportComplianceReport);

module.exports = router;
