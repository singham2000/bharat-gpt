const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");
const fs = require("fs");
const uploadDir = path.join(__dirname, "uploads");

// Check if the directory exists, and create it if not
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true }); // Create directory recursively
}

// Multer storage configuration
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/"); // Destination folder for uploaded files
  },
  filename: function (req, file, cb) {
    // Generate a unique name for the file
    const uniqueSuffix = Date.now() +  Math.round(Math.random() * 1e9);
    const extension = path.extname(file.originalname);
    cb(null, file.fieldname + "-" + uniqueSuffix + extension);
  },
});

const upload = multer({ storage: storage });

// Serve static files from the 'public' directory (if needed)


const {
  getContent,
  updateContent,
  updateStatus,
} = require("../controllers/contentController");

router
  .route("/content")
  .get(getContent)
  .post(upload.single("file"), updateContent);
router.route("/stat").post(updateContent);

module.exports = router;
