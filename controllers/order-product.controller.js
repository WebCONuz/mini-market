const { errorHandler } = require("../helpers/error-handler");
const OrderProduct = require("../models/order_product.model");

const addData = async (req, res) => {
  try {
    const newData = await OrderProduct.create(req.body);
    res.status(201).send({
      message: "Create",
      data: newData,
    });
  } catch (error) {
    errorHandler(error, res);
  }
};

const getAll = async (req, res) => {
  try {
    const allData = await OrderProduct.findAll();
    res.status(200).send({
      msg: "Success",
      data: allData,
    });
  } catch (error) {
    errorHandler(error, res);
  }
};

const remove = async (req, res) => {
  try {
    await OrderProduct.destroy({
      where: {
        id: +req.params.id,
      },
    });
    res.status(200).send({
      message: "Deleted",
    });
  } catch (error) {
    errorHandler(error, res);
  }
};

module.exports = {
  addData,
  getAll,
  remove,
};
