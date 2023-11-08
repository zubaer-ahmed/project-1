const models = require("../models");

// Methods to be executed on routes
const getComments = async (req, res) => {
  const comments = await models.Comment.find({})
    .populate("senderId")
    .populate("sourceJobId")
    .populate("replies");

  return res.json(comments);
};
const getCommentsByType = async (req, res) => {
  const comments = await models.Comment.find({ commentType: req.params.type })
    .populate("senderId")
    .populate("sourceJobId")
    .populate("replies"); // Populate the "replies" field

  return res.json(comments);
};
const getComment = async (req, res) => {
  const comment = await models.Comment.findOne({ _id: req.params.id })
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
  return res.json(comment);
};
const replyComment = async (req, res) => {
  if (!req.user) return res.status(401).json({ error: "Unauthorized" });
  let newComment = await models.Comment.create({
    senderId: req.user,
    sourceJobId: req.body.sourceJobId,
    commentType: "reply",
    text: req.body.text,
  });
  await newComment.save();
  await models.Comment.updateOne(
    { _id: req.params.id },
    { $push: { replies: newComment._id } }
  );
  return res.json(newComment);
};
const updateComment = async (req, res) => {
  return res.json(
    await models.Comment.updateOne({ _id: req.body._id }, req.body)
  );
};
const deleteComment = async (req, res) => {
  return res.json(await models.Comment.deleteOne({ _id: req.body._id }));
};
const createComment = async (req, res) => {
  return res.json(await models.Comment.create(req.body));
};
// Export of all methods as object
module.exports = {
  getComments,
  getCommentsByType,
  getComment,
  updateComment,
  deleteComment,
  createComment,
  replyComment,
};
