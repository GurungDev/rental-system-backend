const express = require("express");
const router = express.Router();
const user = require("./user/user.routes");
const listing = require("./listing/listing.routes");
const rental = require("./rental/rental.routes");

router.use("/user", user);
router.use("/listing", listing);
router.use("/rental", rental);
module.exports = router;
