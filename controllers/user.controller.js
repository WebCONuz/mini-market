const { errorHandler } = require("../helpers/error-handler");
const User = require("../models/user.model");
const Order = require("../models/order.model");

const addData = async (req, res) => {
  try {
    const newData = await User.create(req.body);
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
    const allData = await User.findAll({
      include: {
        model: Order,
        as: "orders",
        attributes: ["id", "total_price", "is_active"],
      },
      attributes: {
        exclude: ["is_active", "password", "refresh_token", "role"],
      },
    });
    res.status(200).send({
      msg: "Success",
      data: allData,
    });
  } catch (error) {
    errorHandler(error, res);
  }
};

const getOne = async (req, res) => {
  try {
    const oneData = await User.findByPk(+req.params.id, {
      include: {
        model: Order,
        as: "orders",
        attributes: ["id", "total_price", "is_active"],
      },
      attributes: {
        exclude: ["is_active", "password", "refresh_token", "role"],
      },
    });
    res.status(200).send({
      msg: "Success",
      data: oneData,
    });
  } catch (error) {
    errorHandler(error, res);
  }
};

const editData = async (req, res) => {
  try {
    const oneData = await User.findByPk(+req.params.id);
    const editData = await User.update(
      { ...oneData, ...req.body },
      {
        where: {
          id: +req.params.id,
        },
      }
    );
    res.status(200).send({
      message: "Update",
      data: editData[0],
    });
  } catch (error) {
    errorHandler(error, res);
  }
};

const remove = async (req, res) => {
  try {
    await User.destroy({
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
  getOne,
  editData,
  remove,
};
