const { auth } = require("../utils");
const { Router } = require("express");
const express = require("express");

// Local Modules
const workerController = require("../controllers/workerController");

// Initialization
const router = Router();
router.use(express.json());

// Requests
router.get("/getWorkers", workerController.getWorkers);
router.get("/getWorker/:id", workerController.getWorker);
router.post("/createWorker", workerController.createWorker);
router.post("/updateWorker", workerController.updateWorker);
router.post("/deleteWorker", workerController.deleteWorker);

module.exports = router;
