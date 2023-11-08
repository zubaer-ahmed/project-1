const mongoose = require("mongoose");

// common models
const User = require("./User");

// models for Admin Panel
const Job = require("./Job");
const Service = require("./Service");
const Comment = require("./Comment");
const Order = require("./Order");
const Message = require("./Message");
const Conversation = require("./Conversation");
const jwt = require("jsonwebtoken");
const services = import("../../frontend/src/Data/services.js");

require("dotenv").config();
// only for development phase
let connectionString = process.env.MONGODB_URI;

async function main() {
  await mongoose.connect(connectionString);
  // mongoose.connection.collections["orders"].drop(function (err) {
  //   console.log("collection dropped");
  // });

  await User.deleteMany({}); // for development phase
  await Job.deleteMany({});
  await Service.deleteMany({});
  await Comment.deleteMany({});
  await Order.deleteMany({});
  await Conversation.deleteMany({});
  await Message.deleteMany({});
  await addTemplates();
  console.log("Connected to MongoDB");
}
main().catch((err) => console.log(err));

module.exports = {
  mongoose,
  User,
  Job,
  Service,
  Comment,
  Order,
  Message,
  Conversation,
};

// info: to check if DB is connected: (mongoose.connection.readyState == 1)

async function addTemplates() {
  let initializerUsers = [
    {
      title: "AdminTitle",
      email: "admin@gmail.com",
      password: "pass3_hash",
      firstName: "John",
      lastName: "Doe",
      jwt: jwt.sign({ email: "admin@gmail.com" }, "jwtSecret"),
      roles: ["admin", "customer"],
    },
    {
      title: "WorkerTitle",
      email: "email1@gmail.com",
      password: "pass1_hash",
      firstName: "firstName1",
      lastName: "lastName1",
      jwt: "jwt1",
      roles: ["customer"],
    },
    {
      title: "CompanyTitle",
      email: "email2@yahoo.com",
      password: "pass2_hash",
      firstName: "firstName2",
      lastName: "lastName2",
      jwt: "jwt2",
      roles: ["worker"],
    },
    {
      title: "IndividualTitle",
      email: "email1@gmail.com",
      password: "pass1_hash",
      firstName: "firstName1",
      lastName: "lastName1",
      jwt: "jwt1",
      roles: ["customer"],
    },
    {
      title: "IndividualTitle",
      email: "email2@yahoo.com",
      password: "pass2_hash",
      firstName: "firstName2",
      lastName: "lastName2",
      jwt: "jwt2",
      roles: ["worker"],
    },
    {
      title: "IndividualTitle",
      email: "email1@gmail.com",
      password: "pass1_hash",
      firstName: "firstName1",
      lastName: "lastName1",
      jwt: "jwt1",
      roles: ["customer"],
    },
    {
      title: "IndividualTitle",
      email: "email2@yahoo.com",
      password: "pass2_hash",
      firstName: "firstName2",
      lastName: "lastName2",
      jwt: "jwt2",
      roles: ["worker"],
    },
  ];

  await User.create(initializerUsers);

  let usr = await User.findOne({ email: "admin@gmail.com" });
  let usr2 = await User.findOne({ email: "admin@gmail.com" });
  let initServices = await services;
  await Service.create(
    initServices.default.map((item) => ({
      ...item,
      uploader: usr,
    }))
  );

  let newConv = await Conversation.create({
    code: usr._id + "-" + usr2._id,
    name: usr.firstName + "-" + usr2.firstName,
    users: [...new Set([usr._id, usr2._id].map((e) => e.toString()))],
  });
  let newMsg = new Message({
    text: "Test Message 1 ...",
    sender: usr,
    conversation: newConv._id,
  });
  await newMsg.save();
}
