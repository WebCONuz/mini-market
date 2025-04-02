const router = require("express").Router();

router.use("/user", require("./user.routes"));
router.use("/order", require("./order.routes"));
router.use("/category", require("./category.routes"));

module.exports = router;
