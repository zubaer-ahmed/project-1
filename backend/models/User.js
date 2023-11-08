const mongoose = require("mongoose");

const User = mongoose.model(
  "User",
  new mongoose.Schema(
    {
      email: String,
      phone: String,
      password: String,
      firstName: String,
      lastName: String,
      fullName: {
        type: String,
        get: function () {
          return `${this.firstName} ${this.lastName}`;
        },
      },
      title: String,
      bio: String,
      jwt: String,
      roles: {
        type: Array,
        default: ["customer"],
      },
      skills: {
        type: Array,
        default: [],
      },
      comments: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Comment",
        },
      ],
      orders: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Order",
        },
      ],
      documentsVerificationStatus: { type: Number, default: 0 },
      verificationStatus: { type: Number, default: 0 },
      loginOTP: String,
      phoneVerified: { type: Boolean, default: false },
      phoneVerificationCode: String,
      emailVerified: { type: Boolean, default: false },
      emailVerificationCode: String,
      documents: {
        documentType: String,
        name: String,
        dateOfBirth: String,
        pictures: [String],
        selfie: String,
        default: {},
      },
      conversations: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Conversation",
          default: [],
        },
      ],
    },
    {
      minimize: false,
      timestamps: true, // This option adds 'createdAt' and 'updatedAt' fields
    }
  )
);

module.exports = User;
