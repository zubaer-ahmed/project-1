const mongoose = require("mongoose");

const Job = mongoose.model(
  "Job",
  new mongoose.Schema(
    {
      title: String,
      description: String,
      budget: String,
      location: String,
      appointmentDate: String,
      employer: {
        // AKA Customer
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    },
    {
      minimize: false,
      timestamps: true, // This option adds 'createdAt' and 'updatedAt' fields
    }
  )
);

module.exports = Job;
