const mongoose = require("mongoose");

const RentalModel = new mongoose.model(
  "Rental",
  new mongoose.Schema({
    selected_pick_up_location: { type: "string", required: true, trim: true },
    selected_pick_up_date: { type: "string", required: true },
    duration: { type: "string", required: true },
    quantity: { type: "string", required: true },
    payment: { type: "string", required: true },
  })
);

module.exports = RentalModel;
