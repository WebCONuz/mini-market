const { errorHandler } = require("../helpers/error-handler");
const User = require("../models/user.model");
const Order = require("../models/order.model");
const userSchema = require("../validations/user.validation");
const bcrypt = require("bcrypt");
const { createTokens } = require("../services/jwt.service");
const config = require("config");
const jwt = require("jsonwebtoken");

const addData = async (req, res) => {
  try {
    const { error, value } = userSchema.validate(req.body);
    if (error) {
      return res.status(400).send({
        message: "Validation error",
        error: error.message,
      });
    }
    const hashedPassword = bcrypt.hashSync(value.password, 7);
    const user = await User.create({ ...value, password: hashedPassword });
    const payload = {
      id: user.id,
      email: user.email,
      role: user.role,
    };
    const { accessToken, refreshToken } = createTokens(payload);
    user.refresh_token = refreshToken;
    await user.save();

    res.cookie("refreshToken", refreshToken, {
      maxAge: config.get("max_age"),
      httpOnly: true,
    });

    res.status(201).send({
      message: "Create",
      accessToken: accessToken,
    });
  } catch (error) {
    errorHandler(error, res);
  }
};

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(404).send("User not found");
    }
    const validPassword = bcrypt.compare(password, user.password);
    if (!validPassword) {
      return res.status(400).send("Password xato");
    }
    const payload = {
      id: user.id,
      email: user.email,
      role: user.role,
    };
    const { accessToken, refreshToken } = createTokens(payload);
    user.refresh_token = refreshToken;
    await user.save();

    res.cookie("refreshToken", refreshToken, {
      maxAge: config.get("max_age"),
      httpOnly: true,
    });

    res.status(200).send({
      message: "Login",
      accessToken: accessToken,
    });
  } catch (error) {
    errorHandler(error, res);
  }
};

const logout = async (req, res) => {
  try {
    const { refreshToken } = req.cookies;
    if (!refreshToken) {
      return res.status(400).send("Refresh token not found");
    }
    const user = await User.findOne({ where: { refresh_token: refreshToken } });
    if (!user) {
      return res.status(404).send("User not found");
    }
    user.refresh_token = null;
    await user.save();
    res.clearCookie("refreshToken");
    res.status(200).send("Logout");
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
        exclude: ["is_active", "password", "role"],
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
  loginUser,
  logout,
};
