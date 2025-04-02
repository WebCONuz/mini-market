const {
  addData,
  getAll,
  getOne,
  editData,
  remove,
} = require("../controllers/product.controller");
const router = require("express").Router();

router.post("/", addData);
router.get("/", getAll);
router.get("/:id", getOne);
router.put("/:id", editData);
router.delete("/:id", remove);

module.exports = router;
