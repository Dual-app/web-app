const express = require("express");
const router = express.Router();
const PaymentController = require("../controller/PaymentController");

router.post("/", PaymentController.createPayment);
router.get("/", PaymentController.getAllPayments);

module.exports = router;
