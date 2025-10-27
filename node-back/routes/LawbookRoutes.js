const express = require("express");
const router = express.Router();
const LawbookController = require("../controller/LawbookController");

router.post("/", LawbookController.createLawbook);
router.get("/", LawbookController.getAllLawbooks);
router.put("/:id", LawbookController.updateLawbook);
router.delete("/:id", LawbookController.deleteLawbook);

module.exports = router;
