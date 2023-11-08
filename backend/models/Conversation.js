const mongoose = require("mongoose");

const conversationSchema = new mongoose.Schema(
  {
    name: String,
    code: String,
    messages: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Message",
        default: [],
      },
    ],
    users: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
  },
  {
    minimize: false,
    timestamps: true, // This option adds 'createdAt' and 'updatedAt' fields
  }
);

conversationSchema.post("save", async function (doc) {
  let conversation = this;
  // console.log(this);
  await mongoose
    .model("User")
    .updateMany(
      { _id: { $in: this.users } },
      { $addToSet: { conversations: this._id } }
    );
});

const Conversation = mongoose.model("Conversation", conversationSchema);

module.exports = Conversation;
