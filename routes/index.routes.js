const router = require("express").Router();

router.use("/user", require("./user.routes"));
router.use("/order", require("./order.routes"));

module.exports = router;
