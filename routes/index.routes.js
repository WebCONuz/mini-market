const router = require("express").Router();

router.use("/user", require("./user.routes"));
router.use("/order", require("./order.routes"));
router.use("/category", require("./category.routes"));
router.use("/product", require("./product.routes"));
router.use("/order-product", require("./order-product.routes"));

module.exports = router;
