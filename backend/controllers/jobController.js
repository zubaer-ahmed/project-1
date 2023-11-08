const models = require("../models");

// Methods to be executed on routes
const getJobs = async (req, res) => {
  return res.json(await models.Order.find({}).populate("user"));
};

const getJob = async (req, res) => {
  const comment = await models.Job.findOne({ _id: req.params.id }).populate(
    "employer"
  );

  return res.json(comment);
};
const updateJob = async (req, res) => {
  return res.json(await models.Job.updateOne({ _id: req.body._id }, req.body));
};
const deleteJob = async (req, res) => {
  return res.json(await models.Job.deleteOne({ _id: req.body._id }));
};
const createJob = async (req, res) => {
  return res.json(await models.Job.create({ ...req.body, employer: req.user }));
};
// Export of all methods as object
module.exports = {
  getJobs,
  getJob,
  updateJob,
  deleteJob,
  createJob,
};
