const { errorHandler } = require("../helpers/error-handler");

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
    res.status(200).send({
      message: "Get All",
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
