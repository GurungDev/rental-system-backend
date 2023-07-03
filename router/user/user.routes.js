const express = require("express");
const authentication = require("../../middleware/authentication");
const [
  register,
  login,
  updateUser,
  findById,
  findAll,
  deleteUser,
] = require("../../controller/user/user.controller");
const { loginRateLimiter } = require("../../middleware/requestLimiter");
const router = express.Router();

router.post("/register", loginRateLimiter, register);
router.post("/login", loginRateLimiter, login);
router.get("/all", authentication, findAll);
router.get("/get", authentication, findById);
router.get("/update", authentication, updateUser);
router.post("/delete", authentication, deleteUser);

module.exports = router;
