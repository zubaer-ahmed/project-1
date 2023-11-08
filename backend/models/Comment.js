const mongoose = require("mongoose");

const Comment = mongoose.model(
  "Comment",
  new mongoose.Schema(
    {
      sourceJobId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Job",
      },
      sourceCommentId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Comment",
      },
      senderId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
      commentType: {
        type: String,
        required: true,
      },
      text: String,
      replies: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Comment", // Reference to the Comment model for replies (nested comments)
        },
      ],
    },
    {
      minimize: false,
      timestamps: true, // This option adds 'createdAt' and 'updatedAt' fields
    }
  )
);

module.exports = Comment;
