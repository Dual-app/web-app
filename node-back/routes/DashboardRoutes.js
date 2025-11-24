const express = require("express");
const router = express.Router();
const DashboardController = require("../controller/DashboardController");

router.get("/dashboard/stats", DashboardController.getDashboardStats);

module.exports = router;