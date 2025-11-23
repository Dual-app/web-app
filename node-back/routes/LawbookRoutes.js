const express = require("express");
const router = express.Router();
const LawbookController = require("../controller/LawbookController");
const upload = require("../middleware/lawbookupload");

router.post("/", upload.single("file"), LawbookController.createLawbook);
router.get("/", LawbookController.getAllLawbooks);
router.put("/:id", LawbookController.updateLawbook);
router.delete("/:id", LawbookController.deleteLawbook);
router.get("/:id", LawbookController.previewLawbook);

module.exports = router;
