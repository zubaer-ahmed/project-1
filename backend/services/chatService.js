const models = require("../models");

const getChat = async (_id) => {
  const chat = await models.Conversation.findOne({ _id })
    .populate("users")
    .populate({
      path: "messages",
      options: { limit: 20 },
      populate: {
        path: "sender",
      },
    });
  return chat;
};
const createMessage = async ({ conversation, sender, text }) => {
  let message = new models.Message({
    text,
    sender,
    conversation,
  });
  await message.save();
  return message.toObject();
};
const updateMessage = async ({ messageId, text }) => {
  let message = await models.Message.updateOne({ _id: messageId }, { text });
};
const deleteMessage = async ({ messageId }) => {
  let message = await models.Message.deleteOne({ _id: messageId });
};

module.exports = {
  getChat,
  createMessage,
  updateMessage,
  deleteMessage,
};
