const models = require("../models");
const chatServices = require("../services/chatService");
// Methods to be executed on routes
const getChats = async (req, res) => {
  return res.json(
    await models.Conversation.find({
      users: { $in: req.user._id },
    })
      .populate("users")
      .populate({
        path: "messages",
        options: { limit: 20 },
        populate: {
          path: "sender",
        },
      })
  );
};

const search = async (req, res) => {
  if (!req.params.keyword) return res.json(await models.Conversation.find({}));
  const chats = await models.Conversation.find({
    name: { $regex: req.params.keyword, $options: "i" },
  });
  return res.json(chats);
};
const getChat = async (req, res) => {
  const chat = await models.Conversation.findOne({
    _id: req.params.id,
  })
    .populate("users")
    .populate({
      path: "messages",
      options: { limit: 20 },
      populate: {
        path: "sender",
      },
    });
  return res.json(chat);
};
const updateChat = async (req, res) => {
  return res.json(
    await models.Conversation.updateOne({ _id: req.body._id }, req.body)
  );
};
const deleteChat = async (req, res) => {
  return res.json(await models.Conversation.deleteOne({ _id: req.body._id }));
};
const createChat = async (req, res) => {
  return res.json(
    await models.Conversation.create({
      name: req.body.name,
      users: req.body.users,
    })
  );
};
const openChat = async (req, res) => {
  let conv = req.user.conversations.find((conv) =>
    conv.users.every((user, i) => user.equals(req.body.users[i]))
  );

  if (conv) return res.json(conv);

  return res.json(
    await models.Conversation.create({
      type: req.body.type,
      name: Date.now().toString(),
      users: new Set([req.user._id, ...req.body.users]),
    })
  );
};
const postMessage = async (req, res) => {
  let conversation = await models.Conversation.findOne({
    _id: req.params.conversationId,
  });
  console.log("postmessage", req.body);
  let message = await models.Message.create({
    ...req.body,
    sender: req.user._id,
    conversation: conversation._id,
  });
  return res.json(message);
};
const updateMessage = async (req, res) => {
  let message = await models.Message.updateOne(
    { _id: req.body._id },
    { ...req.body }
  );
};
const deleteMessage = async (req, res) => {
  let message = await models.Message.deleteOne({ _id: req.body._id });
};

module.exports = {
  search,
  getChats,
  getChat,
  updateChat,
  deleteChat,
  createChat,
  openChat,

  postMessage,
  updateMessage,
  deleteMessage,
};
