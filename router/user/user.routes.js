const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const authentication = require("../../middleware/authentication");
const [
  register,
  login,
  findById,
  findAll,
  deleteUser,
  update,
] = require("../../controller/user/user.controller");
const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.get("/all", authentication, findAll);
router.get("/get/:id", authentication, findById);
router.get("/update", authentication, update);
router.post("/delete", authentication, deleteUser);

module.exports = router;
