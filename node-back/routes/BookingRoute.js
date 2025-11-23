const express = require("express");
const router = express.Router();
const BookingController = require("../controller/BookingController");
const upload = require("../middleware/bookingupload");

router.post("/", upload.single("Document"), BookingController.createBooking);
router.get("/", BookingController.getAllBookings);
router.delete("/:id", BookingController.deleteBooking);
router.get("/customer/:id", BookingController.getByCustomer);
router.put("/close/:id", BookingController.closeBooking);

module.exports = router;
