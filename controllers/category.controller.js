const { errorHandler } = require("../helpers/error-handler");
const Category = require("../models/category.model");

const addData = async (req, res) => {
  try {
    const newData = await Category.create(req.body);
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
    const allData = await Category.findAll({
      include: {
        model: Category,
        as: "parent",
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

const getSub = async (req, res) => {
  try {
    const allData = await Category.findAll({
      include: {
        model: Category,
        as: "subcategories",
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
    const oneData = await Category.findByPk(+req.params.id, {
      include: {
        model: Category,
        as: "parent",
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
    const oneData = await Category.findByPk(+req.params.id);
    const editData = await Category.update(
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
    await Category.destroy({
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
  getSub,
  getOne,
  editData,
  remove,
};
