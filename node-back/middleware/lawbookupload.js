const multer = require("multer");
const fs = require("fs");
const path = require("path");

// Destination folder: ../pngfiles/Lawbook
const fullDir = path.join(__dirname, "..", "pngfiles", "Lawbook");

if (!fs.existsSync(fullDir)) {
  fs.mkdirSync(fullDir, { recursive: true });
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, fullDir),

  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    const fileName = Date.now() + "-" + Math.random().toString(36).substr(2, 9) + ext;
    cb(null, fileName);
  }
});

const upload = multer({ storage });

module.exports = upload;
