// 3rd Party Modules
const { Router } = require("express");
const express = require("express");
const { auth } = require("../utils");

// Local Modules
const jobController = require("../controllers/jobController");

// Initialization
const router = Router();
router.use(express.json());

// Requests
router.get("/getJobs", jobController.getJobs);
router.get("/getJob/:id", jobController.getJob);
router.post("/createJob", auth, jobController.createJob);
router.post("/updateJob", jobController.updateJob);
router.post("/deleteJob", jobController.deleteJob);

module.exports = router;
