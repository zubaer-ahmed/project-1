const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    provider: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    serviceId: String,
    service: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Service",
    },
    otp: String,
    description: String,
    time: String,
    location: String,
    data: {
      type: Object,
      default: {},
    },
    step: Number,
    status: Number,
    statusText: String,
  },
  {
    minimize: false,
    timestamps: true, // This option adds 'createdAt' and 'updatedAt' fields
  }
);

var autoPopulateService = function (next) {
  this.populate("user").populate("provider").populate("service");
  next();
};

orderSchema
  .pre("findOne", autoPopulateService)
  .pre("find", autoPopulateService);

const Order = mongoose.model("Order", orderSchema);

module.exports = Order;
