const {
  addData,
  getAll,
  remove,
} = require("../controllers/order-product.controller");
const router = require("express").Router();

router.post("/", addData);
router.get("/", getAll);
router.delete("/:id", remove);

module.exports = router;
