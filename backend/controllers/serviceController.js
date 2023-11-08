const models = require("../models");

// Methods to be executed on routes
const getServices = async (req, res) => {
  return res.json(await models.Service.find({}).populate("uploader"));
};

const search = async (req, res) => {
  if (!req.params.keyword) return res.json(await models.Service.find({}));
  const services = await models.Service.find({
    name: { $regex: req.params.keyword, $options: "i" },
  });
  console.log(req.params.keyword);
  return res.json(services);
};
const getService = async (req, res) => {
  const comment = await models.Service.findOne({ _id: req.params.id }).populate(
    "worker"
  );

  return res.json(comment);
};
const updateService = async (req, res) => {
  return res.json(
    await models.Service.updateOne({ _id: req.body._id }, req.body)
  );
};
const deleteService = async (req, res) => {
  return res.json(await models.Service.deleteOne({ _id: req.body._id }));
};
const createService = async (req, res) => {
  return res.json(
    await models.Service.create({
      ...req.body,
      worker: req.user,
      status: 0,
      statusText: "Ongoing",
    })
  );
};
const orderService = async (req, res) => {
  return res.json(
    await models.Order.create({
      service: req.body,
      user: req.user,
      amount: req.body.amount,
    })
  );
};

// Export of all methods as object
module.exports = {
  search,
  getServices,
  getService,
  updateService,
  deleteService,
  createService,
  orderService,
};
