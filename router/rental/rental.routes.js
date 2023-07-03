const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const authentication = require("../../middleware/authentication");
const [
  addRental,
  updateRental,
  deleteRental,
  getAllRental,
  getRental,
] = require("../../controller/rental/rental.controller");
const { rentalPost } = require("../../middleware/requestLimiter");
const router = express.Router();

router.get("/all", getAllRental);
router.post("/add", authentication, rentalPost, addRental);
router.get("/get", authentication, getRental);
router.post("/update", authentication, updateRental);
router.post("/delete", authentication, deleteRental);

module.exports = router;
