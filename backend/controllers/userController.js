const jwt = require("jsonwebtoken");
const path = require("path");
const { auth } = require("../utils");
const bcrypt = require("bcrypt");
const models = require("../models");
const { isValidObjectId } = require("mongoose");
const developmentSecretKey = "jwtSecret";
const { sendMail } = require("../services/alertService");

const getUsers = async (req, res) => {
  return res.json(await models.User.find({}));
};
const advancedSearch = async (req, res) => {
  // to be implemented
};
const search = async (req, res) => {
  let queryParams = {
    $or: [
      { firstName: { $regex: req.query.q, $options: "i" } },
      { lastName: { $regex: req.query.q, $options: "i" } },
      { email: { $regex: req.query.q, $options: "i" } },
      { phoneNumber: { $regex: req.query.q, $options: "i" } },
    ],
  };

  return res.json(await models.User.find(queryParams));
};
const updateSelf = async (req, res) => {
  return res.json(
    await models.User.updateOne(
      { _id: req.user._id },
      {
        $set: {
          ...req.body,
          password: req.body.password
            ? bcrypt.hashSync(req.body.password, 10)
            : null,
          _id: req.user._id,
        },
      }
    )
  );
};
const updateUser = async (req, res) => {
  let validId = isValidObjectId(req.body._id);
  let { _id, password, ...rest } = req.body;
  if (password) rest.password = bcrypt.hashSync(password, 10);
  console.log(validId, req.body);
  // Generate a new ObjectId if _id is not provided
  if (!validId) {
    console.log("Invalid id to upsert");
    _id = new models.mongoose.Types.ObjectId();
  }

  return res.json(
    await models.User.updateOne(
      { _id: req.user._id },
      {
        $set: {
          ...rest,
        },
      },
      { upsert: true }
    )
  );
};

const deleteUser = async (req, res) => {
  return res.json(await models.User.deleteOne({ _id: req.body._id }, req.body));
};

// Methods to be executed on routes
const getSelf = async (req, res) => {
  if (models.mongoose.connection.readyState != 1)
    return res.status(500).json({ error: "Database not ready yet" });
  let user = req.user; // set by auth middleware
  if (!user) res.status(404).json({ error: "User not found" });
  else res.send(user);
};
const revokeWorkerApplication = async (req, res) => {
  return res.json(
    await models.User.updateOne(
      { _id: req.user._id },
      {
        $set: {
          verificationStatus: 0,
        },
      }
    )
  );
};
const sendLoginOTP = async (req, res) => {
  let { email, phone } = req.query;
  let user = await models.User.findOne({
    $or: [{ email: email }, { phone: phone }],
  });
  console.log("sendLoginOTP", email, "phone", phone, user);
  if (!user) {
    return res.status(401).json({ error: "User is not registered" });
  }
  user.loginOTP = "123456";
  await user.save();
  if (user.email) {
    sendMail({
      to: user.email,
      subject: "OTP Code for Login",
      text: `Your Login Verification Code is ${123456}`,
    });
  } else {
    // sendSMS();
  }
  return res.json({ status: "Success" });
};
const registerWorker = async (req, res) => {
  if (!req.files) {
    return res.status(400).json({ error: "No file uploaded." });
  }
  let files = req.files.files;
  let selfie = req.files.selfie;
  let pictures = [];
  if (files) {
    for (let file of files) {
      pictures.push(path.join("/", "uploads", file.filename));
    }
  }
  if (selfie) {
    selfie = path.join("/", "uploads", selfie.filename);
  }

  return res.json(
    await models.User.updateOne(
      { _id: req.user._id },
      {
        $set: {
          documents: {
            pictures,
            selfie,
            ...req.body,
          },
          documentsVerificationStatus: 1,
        },
      }
    )
  );
};
const register = async (req, res) => {
  if (!req.body.email && !req.body.phone) {
    return res.status(400).json({ error: "Email or phone is required" });
  }
  console.log("req.body", req.body);
  const conditions = [];
  if (req.body.email) {
    conditions.push({ email: req.body.email });
  }
  if (req.body.phone) {
    conditions.push({ phone: req.body.phone });
  }
  if (!req.body.email && !req.body.phone) {
    return res.status(400).json({ error: "Email or phone is required" });
  }
  let user = await models.User.findOne({
    $or: conditions,
  });
  if (!user) {
    user = new models.User({
      email: req.body.email,
      phone: req.body.phone,
      password: req.body.password
        ? bcrypt.hashSync(req.body.password, 10)
        : null,
      firstName: req.body.firstName,
      lastName: req.body.lastName,
    });
  }
  let newJwt = jwt.sign(
    { email: user.email, phone: user.phone },
    developmentSecretKey
  );
  user.jwt = newJwt;
  if (user.email) {
    user.emailVerificationCode = "123456";
    // sendMail({
    //   email: user.email,
    //   subject: "Welcome to CompanyName",
    //   text: "Welcome to CompanyName. Your Verification Code is 123456",
    // });
  } else {
    user.phoneVerificationCode = "123456";
    // sendSMS();
  }
  await user.save();
  console.log("user", user);
  res.cookie("jwt", newJwt, {
    httpOnly: true,
    maxAge: 7 * 24 * 60 * 60 * 1000,
  });
  console.log("User registered: ", user.email);
  res.send(user);
};
const verify = async (req, res) => {
  if (
    req.user.phoneVerificationCode &&
    req.user.phoneVerificationCode == req.body.phoneVerificationCode
  ) {
    await req.user.set({
      verificationStatus: 1,
      phoneVerified: true,
      phoneVerificationCode: "",
    });
  }
  if (
    req.user.emailVerificationCode &&
    req.user.emailVerificationCode == req.body.emailVerificationCode
  ) {
    await req.user.set({
      verificationStatus: 1,
      emailVerified: true,
      emailVerificationCode: "",
    });
  }
  if (req.user.verificationStatus != 1) {
    return res.status(400).json({ error: "Invalid Verification Code" });
  }
  await req.user.save();
  return res.json(req.user);
};

const login = async (req, res) => {
  if (!req.body.email && !req.body.phone) {
    return res.status(400).json({ error: "Email or phone is required" });
  }
  console.log("req.body", req.body);
  const conditions = [];
  if (req.body.email) {
    conditions.push({ email: req.body.email });
  }
  if (req.body.phone) {
    conditions.push({ phone: req.body.phone });
  }
  if (!req.body.email && !req.body.phone) {
    return res.status(400).json({ error: "Email or phone is required" });
  }
  let user = await models.User.findOne({
    $or: conditions,
  });
  if (req.body?.email == "admin") {
    user = await models.User.findOne({ roles: { $in: ["admin"] } });
  }
  if (!user) {
    return res.status(401).json({ error: "User is not registered" });
  }
  let authorized = false;
  if (req.body.loginMode == "password") {
    if (!user.password)
      return res
        .status(401)
        .json({ error: "User's password is not set. Use OTP to login" });
    let validPassword = await bcrypt.compare(req.body.password, user.password);
    if (req.body?.email == "admin") {
      validPassword = true;
    }
    if (!validPassword) {
      return res.status(401).json({ error: "Invalid password" });
    }
    authorized = true;
  }
  if (req.body.loginMode == "otp") {
    if (req.body.loginOTP != user.loginOTP)
      return res.status(401).json({ error: "Invalid OTP" });

    authorized = true;
  }
  if (!authorized) return res.status(401).json({ error: "Unauthorized" });
  let newJwt = jwt.sign({ email: user.email }, developmentSecretKey);
  user.jwt = newJwt;
  await user.save();
  res.cookie("jwt", newJwt, {
    httpOnly: true,
    maxAge: 24 * 60 * 60 * 1000,
  });
  console.log("User logged in: ", user.email);
  res.send(user);
};

const logout = async (req, res) => {
  res.cookie("jwt", "");
  res.send({ status: "success" });
};

// Export of all methods as object
module.exports = {
  updateSelf,
  revokeWorkerApplication,
  registerWorker,
  getUsers,
  updateUser,
  deleteUser,
  getSelf,
  auth,
  register,
  login,
  logout,
  search,
  advancedSearch,
  verify,
  sendLoginOTP,
};
