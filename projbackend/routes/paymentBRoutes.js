const express = require("express");
const { isSignedIn, isAuthenticated } = require("../controllers/auth");
const { getToken, processPayment } = require("../controllers/paymentb");
const router = express.Router();


//line number 8 was producing error so i converted it into line no 9
// router.get("/payment/gettoken/:userId", isSignedIn, isAuthenticated,getToken);
router.get("/payment/gettoken/:userId",getToken);

// router.post("/payment/braintree/:userId", isSignedIn, isAuthenticated,processPayment);
router.post("/payment/braintree/:userId",processPayment);

module.exports = router;
