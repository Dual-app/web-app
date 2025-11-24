const express = require("express");
const router = express.Router();
const BookingController = require("../controller/BookingController");
const upload = require("../middleware/bookingupload");

router.post(
  "/with-payment",
  upload.single("Document"),
  BookingController.createBookingWithPayment
);
router.get("/", BookingController.getAllBookings);
router.delete("/:id", BookingController.deleteBooking);
router.get("/customer/:id", BookingController.getByCustomer);
router.put("/close/:id", BookingController.closeBooking);
router.put("/schedule/:id", BookingController.insertScheduleID);
router.get("/:id", BookingController.previewDocument);

module.exports = router;
