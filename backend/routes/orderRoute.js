// 3rd Party Modules
const { Router } = require("express");
const express = require("express");
const { auth } = require("../utils");

// Local Modules
const orderController = require("../controllers/orderController");

// Initialization
const router = Router();
router.use(express.json());

// Requests
router.get("/getAllOrders", orderController.getAllOrders);
router.get("/getOrders", auth, orderController.getOrders);
router.get("/getAcceptedOrders", auth, orderController.getAcceptedOrders);
router.get("/getOrder/:id", orderController.getOrder);
router.get("/acceptOrder/:id", auth, orderController.acceptOrder);
router.get("/markDone/:id", auth, orderController.markDone);
router.post("/updateOrder", orderController.updateOrder);
router.post("/postOrder", auth, orderController.postOrder);
router.post("/deleteOrder", orderController.deleteOrder);

module.exports = router;
