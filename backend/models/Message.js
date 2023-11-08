const mongoose = require("mongoose");

const messsageSchema = new mongoose.Schema(
  {
    text: String,
    sender: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    conversation: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Conversation",
      required: true,
    },
  },
  {
    minimize: false,
    timestamps: true, // This option adds 'createdAt' and 'updatedAt' fields
  }
);

messsageSchema.post("save", async function (doc) {
  let conv = await mongoose
    .model("Conversation")
    .findOne({ _id: this.conversation });
  conv.messages.push(this._id);
  // console.log("save", conv.messages);
  await conv.save();
});
messsageSchema.post("deleteOne", async function (doc) {
  console.log("message remove");
  let conversation = await mongoose
    .model("Conversation")
    .findOne({ _id: this.conversation });

  const updatedMessages = conversation.messages.filter(
    (messageId) => messageId.toString() !== doc._id.toString()
  );
  await conversation.updateOne({ messages: updatedMessages });
});
const Message = mongoose.model("Message", messsageSchema);
module.exports = Message;
