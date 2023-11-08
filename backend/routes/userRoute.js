// 3rd Party Modules
const { Router } = require("express");
const express = require("express");
const { auth } = require("../utils");
const multer = require("multer");
const upload = multer({ dest: "uploads/" });
// Local Modules
const userController = require("../controllers/userController");

// Initialization
const router = Router();
router.use(express.json());

// Requests
router.get("/", (req, res) => {
  res.send("Hello");
});
router.post(
  "/registerWorker",
  auth,
  upload.fields([
    { name: "files", maxCount: 10 },
    { name: "pfp", maxCount: 1 },
  ]),
  userController.registerWorker
);
router.get("/getUsers", userController.getUsers);
router.get(
  "/revokeWorkerApplication",
  auth,
  userController.revokeWorkerApplication
);
router.post("/updateUser", auth, userController.updateUser);
router.post("/deleteUser", userController.deleteUser);
router.get("/getSelf", auth, userController.getSelf);
router.post("/register", userController.register);
router.post("/verify", auth, userController.verify);
router.post("/login", userController.login);
router.get("/logout", userController.logout);
router.get("/search", userController.search);
router.post("/advancedSearch", userController.advancedSearch);
router.get("/sendLoginOTP", userController.sendLoginOTP);

module.exports = router;
