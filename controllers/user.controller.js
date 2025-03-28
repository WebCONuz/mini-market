const { errorHandler } = require("../helpers/error-handler");
const User = require("../models/user.model");

const addData = async (req, res) => {
  try {
    res.status(200).send({
      message: "Create",
    });
  } catch (error) {
    errorHandler(error, res);
  }
};

const getAll = async (req, res) => {
  try {
    const allData = await User.findAll();
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
    res.status(200).send({
      message: "Get One",
    });
  } catch (error) {
    errorHandler(error, res);
  }
};

const editData = async (req, res) => {
  try {
    res.status(200).send({
      message: "Update",
    });
  } catch (error) {
    errorHandler(error, res);
  }
};

const remove = async (req, res) => {
  try {
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
