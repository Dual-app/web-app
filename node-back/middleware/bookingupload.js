const multer = require("multer");
const fs = require("fs");
const path = require("path");

// Destination folder: ../pngfiles/Bookingcase
const fullDir = path.join(__dirname, "..", "pngfiles", "Bookingcase");

if (!fs.existsSync(fullDir)) {
  fs.mkdirSync(fullDir, { recursive: true });
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, fullDir),

  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    const unique = Date.now() + "-" + Math.random().toString(36).slice(2);
    cb(null, unique + ext);
  },
});

const upload = multer({ storage });

module.exports = upload;
