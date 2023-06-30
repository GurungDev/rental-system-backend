const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const authentication = require("../../middleware/authentication");
const [
  addListing,
  updateListing,
  deleteListing,
  getAllListing,
  getListing,
  getListingDetails,
] = require("../../controller/listing/listing.controller");
const uploadImage = require("../../middleware/uploadImage");
const router = express.Router();

router.post("/add", authentication, uploadImage(), addListing);
router.post("/update", authentication, updateListing);
router.post("/delete", authentication, deleteListing);
router.get("/all", getAllListing);
router.get("/get", getListing);
router.get("/getDetails", authentication, getListingDetails);

module.exports = router;
