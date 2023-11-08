const { auth } = require("../utils");
const { Router } = require("express");
const express = require("express");

// Local Modules
const commentController = require("../controllers/commentController");

// Initialization
const router = Router();
router.use(express.json());

// Requests
router.get("/getComments", commentController.getComments);
router.get("/getComments/:type", commentController.getCommentsByType);
router.get("/getComment/:id", commentController.getComment);
router.post("/replyComment/:id", auth, commentController.replyComment);
router.post("/createComment", commentController.createComment);
router.post("/updateComment", commentController.updateComment);
router.post("/deleteComment", commentController.deleteComment);

module.exports = router;
