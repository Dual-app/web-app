const express = require("express");
const router = express.Router();
const AdminController = require("../controller/AdminController");

router.post("/", AdminController.createAdmin);
router.get("/", AdminController.getAllAdmins);
router.put("/:id", AdminController.updateAdmin);
router.delete("/:id", AdminController.deleteAdmin);
module.exports = router;