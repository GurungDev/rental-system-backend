const mongoose = require("mongoose");

const ListingModel = new mongoose.model(
  "Listing",
  new mongoose.Schema({
    name: { type: "string", required: true, trim: true },
    price_per_hour: { type: "number", required: true },
    type: { type: "number", required: true },
    price_per_day: { type: "number", required: true },
    contact: { type: "string", required: true },
    address: { type: "string", required: true },
    quantity: { type: "number", required: true },
    details: { type: "string", required: true },
    image: { type: "string", required: true },
  })
);

module.exports = ListingModel;
