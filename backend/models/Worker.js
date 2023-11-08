const mongoose = require("mongoose");

const Worker = mongoose.model(
  "Worker",
  new mongoose.Schema(
    {
      title: String,
      services: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Service", // Reference to the Worker model for replies (nested workers)
        },
      ],
    },
    {
      minimize: false,
      timestamps: true, // This option adds 'createdAt' and 'updatedAt' fields
    }
  )
);

module.exports = Worker;
