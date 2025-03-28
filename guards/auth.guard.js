const { verifyAccessToken } = require("../services/jwt");

function authGuard(req, res, next) {
  const authorization = req.headers.authorization;
  const prefix = authorization?.split(" ")?.[0];
  const token = authorization?.split(" ")?.[1];

  if (prefix !== "Bearer" || !token) {
    return res.status(401).send({
      message: "Ro'yxatdan o'tilmagan",
    });
  }

  const decoded = verifyAccessToken(token, res);
  req.user = decoded;
  next();
}

module.exports = authGuard;
