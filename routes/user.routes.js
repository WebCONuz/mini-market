const {
  addData,
  getAll,
  getOne,
  editData,
  remove,
  loginUser,
  logout,
} = require("../controllers/user.controller");
const router = require("express").Router();

router.post("/", addData);
router.post("/login", loginUser);
router.get("/logout", logout);
router.get("/", getAll);
router.get("/:id", getOne);
router.put("/:id", editData);
router.delete("/:id", remove);

module.exports = router;
