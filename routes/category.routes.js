const {
  addData,
  getAll,
  getSub,
  getOne,
  editData,
  remove,
} = require("../controllers/category.controller");
const router = require("express").Router();

router.post("/", addData);
router.get("/", getAll);
router.get("/sub", getSub);
router.get("/:id", getOne);
router.put("/:id", editData);
router.delete("/:id", remove);

module.exports = router;
