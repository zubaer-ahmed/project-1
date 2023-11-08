const models = require("../models");

// Methods to be executed on routes
const getWorkers = async (req, res) => {
  const workers = await models.Worker.find({});

  return res.json(workers);
};
const getWorkersByType = async (req, res) => {
  const workers = await models.Worker.find({ workerType: req.params.type })
    .populate("senderId")
    .populate("sourceJobId")
    .populate("replies"); // Populate the "replies" field

  return res.json(workers);
};
const getWorker = async (req, res) => {
  const worker = await models.Worker.findOne({ _id: req.params.id })
    .populate("senderId")
    .populate("sourceJobId")
    .populate({
      path: "replies",
      populate: [
        { path: "senderId" },
        { path: "sourceJobId" },
        // Add more fields you want to populate within the "replies" array
      ],
    });
  return res.json(worker);
};
const replyWorker = async (req, res) => {
  if (!req.user) return res.status(401).json({ error: "Unauthorized" });
  let newWorker = await models.Worker.create({
    senderId: req.user,
    sourceJobId: req.body.sourceJobId,
    workerType: "reply",
    text: req.body.text,
  });
  await newWorker.save();
  await models.Worker.updateOne(
    { _id: req.params.id },
    { $push: { replies: newWorker._id } }
  );
  return res.json(newWorker);
};
const updateWorker = async (req, res) => {
  return res.json(
    await models.Worker.updateOne({ _id: req.body._id }, req.body)
  );
};
const deleteWorker = async (req, res) => {
  return res.json(await models.Worker.deleteOne({ _id: req.body._id }));
};
const createWorker = async (req, res) => {
  return res.json(await models.Worker.create(req.body));
};
// Export of all methods as object
module.exports = {
  getWorkers,
  getWorkersByType,
  getWorker,
  updateWorker,
  deleteWorker,
  createWorker,
  replyWorker,
};
