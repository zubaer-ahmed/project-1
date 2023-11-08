const models = require("../models");
const { sendMail } = require("../services/alertService");
const getAllOrders = async (req, res) => {
  return res.json(
    await models.Order.find({}).populate("user").populate("provider")
  );
};
// Methods to be executed on routes
const getOrders = async (req, res) => {
  return res.json(
    await models.Order.find({
      user: req.user._id,
      step: 0,
    }) // auto populates  user, provider, service on find, findOne
  );
};
const getAcceptedOrders = async (req, res) => {
  return res.json(
    await models.Order.find({
      provider: req.user._id,
    })
      .populate("user")
      .populate("provider")
  );
};

const getOrder = async (req, res) => {
  try {
    const order = await models.Order.findOne({ _id: req.params.id })
      .populate("user")
      .populate("provider");

    return res.json(order);
  } catch (err) {
    return res.json(null);
  }
};
const acceptOrder = async (req, res) => {
  try {
    const result = await models.Order.updateOne(
      { _id: req.params.id },
      {
        provider: req.user._id,
        step: 1,
      }
    );
    const order = await models.Order.findOne({ _id: req.params.id });
    order.otp = Math.floor(100000 + Math.random() * 900000);
    await order.save();
    console.log("sending mail to ", order.user.email, order.provider.email);
    sendMail({
      subject: "Order Accepted",
      to: order.user.email,
      text: `Provider with name ${order.provider.firstName} has accepted your order. Verify this OTP code with the provider: ${order.otp}`,
    });
    sendMail({
      subject: "Order Accepted",
      to: order.provider.email,
      text: `You accepted the job for ${order.service.name}. Your OTP code to work on this job is: ${order.otp}`,
    });
    return res.json(order);
  } catch (err) {
    console.log(err);
    return res.json({ error: err });
  }
};
const markDone = async (req, res) => {
  try {
    const result = await models.Order.updateOne(
      { _id: req.params.id },
      {
        step: 2,
      }
    );
    const order = await models.Order.findOne({ _id: req.params.id });
    sendMail({
      subject: "Order Accepted",
      to: order.user.email,
      text: `Provider with name ${order.provider.firstName} has accepted your order. Verify this OTP code with the provider: ${order.otp}`,
    });
    sendMail({
      subject: "Order Accepted",
      to: order.provider.email,
      text: `You accepted the job for ${order.service.name}. Your OTP code to work on this job is: ${order.otp}`,
    });
    return res.json(order);
  } catch (err) {
    return res.json({ error: err });
  }
};
const updateOrder = async (req, res) => {
  return res.json(
    await models.Order.updateOne({ _id: req.body._id }, req.body)
  );
};
const deleteOrder = async (req, res) => {
  return res.json(await models.Order.deleteOne({ _id: req.body._id }));
};
const postOrder = async (req, res) => {
  const newOrder = await models.Order.create({
    ...req.body,
    step: 0,
    data: req.body.data,
    user: req.user,
    status: 1,
    statusText: "Ongoing",
  });
  await newOrder.save();

  await models.User.updateOne(
    { _id: req.user._id },
    { $push: { orders: newOrder._id } }
  );
  return res.json(newOrder);
};

// Export of all methods as object
module.exports = {
  acceptOrder,
  markDone,
  getAllOrders,
  getOrders,
  getAcceptedOrders,
  getOrder,
  updateOrder,
  deleteOrder,
  postOrder,
};
