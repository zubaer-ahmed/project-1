// 3rd Party Modules
const { Router } = require("express");
const express = require("express");
const { auth } = require("../utils");

// Local Modules
const chatController = require("../controllers/chatController");

// Initialization
const router = Router();
router.use(express.json());

// Requests
router.get("/getChats", auth, chatController.getChats);
router.get("/search/:keyword", chatController.search);
router.get("/search", chatController.search);
router.get("/getChat/:id", auth, chatController.getChat);
router.post("/updateChat", auth, chatController.updateChat);
router.post("/createChat", auth, chatController.createChat);
router.post("/deleteChat", auth, chatController.deleteChat);
router.post("/openChat", auth, chatController.openChat);

router.post("/postMessage/:conversationId", auth, chatController.postMessage);
router.post("/updateMessage", auth, chatController.updateMessage);
router.post("/deleteMessage", auth, chatController.deleteMessage);

module.exports = router;
