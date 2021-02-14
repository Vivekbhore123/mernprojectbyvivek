const express = require("express");
const router = express.Router();

const { isAuthenticated, isSignedIn, isAdmin } = require("../controllers/auth");
const { getUserById, pushOrderInPurchaseList } = require("../controllers/user"); 
const { updateStock } = require("../controllers/product");

const {
  getOrderById,  
  createOrder,
  getAllOrders,
  updateStatus,
  getOrderStatus,
} = require("../controllers/order");



//params
router.param("userId",getUserById);
router.param("orderId",getOrderById);


//actual routes
// create route 
router.post(
  "/order/create/:userId", 
  // isAuthenticated,
  // isSignedIn,
  pushOrderInPurchaseList,
  updateStock,
  createOrder
);

//read route
router.get(
  "/order/all/:userId",
  isSignedIn,
  isAuthenticated,
  isAdmin,
  getAllOrders
);

//status of orders
router.get("/order/status/:userId",
 isSignedIn,
  isAuthenticated,
  isAdmin,
  getOrderStatus 
  );

router.put(
  "/order/:orderId/status/:userId",
  isSignedIn,
  isAuthenticated,
  isAdmin,
  updateStatus
);

module.exports = router;
