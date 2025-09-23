const express = require("express");
const router = express.Router();
const LawyerController = require("../controller/LawyerController");

router.post("/", LawyerController.createLawyer);
router.get("/", LawyerController.getAllLawyers);
router.put("/:id", LawyerController.updateLawyer);
router.delete("/:id", LawyerController.deleteLawyer);

module.exports = router;
