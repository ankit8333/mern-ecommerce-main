const express = require("express");
const router = express.Router();
const { initializePayment, verifyPayment } = require("../controllers/paymentController");

// Initialize Payment
router.post("/", initializePayment);

// Verify Payment
router.get("/verify/:id", verifyPayment);

module.exports = router;
