const config = require("config");
const jwt = require("jsonwebtoken");

const createTokens = (payload) => {
  const accessToken = jwt.sign(payload, config.get("access_key"), {
    expiresIn: config.get("access_time"),
  });
  const refreshToken = jwt.sign(payload, config.get("refresh_key"), {
    expiresIn: config.get("refresh_time"),
  });
  return { accessToken, refreshToken };
};

const verifyAccessToken = (token, res) => {
  try {
    const decodedData = jwt.verify(token, config.get("access_key"));
    return decodedData;
  } catch (error) {
    return res.status(401).send({
      message: "Token xato!",
    });
  }
};

const verifyRefreshToken = (token, res) => {
  try {
    const decodedData = jwt.verify(token, config.get("refresh_key"));
    return decodedData;
  } catch (error) {
    return res.status(401).send({
      message: "Token xato!",
    });
  }
};

module.exports = { createTokens, verifyAccessToken, verifyRefreshToken };
