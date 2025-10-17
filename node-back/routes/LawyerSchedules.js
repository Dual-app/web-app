const express = require("express");
const router = express.Router();
const LawyerScheduleController = require("../controller/LawyerScheuldeController");

router.post("/", LawyerScheduleController.createLawyerSchedule);
router.get("/", LawyerScheduleController.getAllLawyerSchedules);
router.put("/:id", LawyerScheduleController.updateLawyerSchedule);
router.delete("/:id", LawyerScheduleController.deleteLawyerSchedule);

module.exports = router;