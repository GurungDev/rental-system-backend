const RentalModel = require("../../model/rental.model");
const RentalDetailsModel = require("../../model/rentalDetails.model");

const addRental = async (req, res) => {
  try {
    let {
      listingId,
      payment,
      quantity,
      duration,
      selected_pick_up_date,
      selected_pick_up_location,
    } = req?.body;
    console.log(req?.body);
    const userId = req.userId;
    const rentalModel = new RentalModel({
      payment,
      quantity,
      duration,
      selected_pick_up_date,
      selected_pick_up_location,
    });
    await rentalModel.save(); //saving the data into rental model database

    const newRentalDetails = new RentalDetailsModel({
      rentalId: rentalModel._id,
      userId,
      listingId,
    });
    await newRentalDetails.save();
    res.status(200).send("Rental has been successful");
  } catch (error) {
    res.status(500).send(error.message);
  }
};

const updateRental = async (req, res) => {
  try {
    console.log("done4");
  } catch (error) {
    res.status(400).send(error.message);
  }
};

const deleteRental = async (req, res) => {
  try {
    const { rentalId, rentalDetailsId } = req.body;
    const rentalDetailsModel = await RentalDetailsModel.findByIdAndDelete(
      rentalDetailsId
    );
    const rental = await RentalModel.findByIdAndDelete(rentalId);
    res.status(200).send("rental deleted successfully");
  } catch (error) {
    res.status(400).send(error.message);
  }
};

const getAllRental = async (req, res) => {
  try {
    const rental = await RentalDetailsModel.find().populate([
      { path: "listingId", select: "name" },
      {
        path: "rentalId",
        select:
          "selected_pick_up_location selected_pick_up_date payment quantity rentalId",
      },
      { path: "userId", select: "userId name" },
    ]);
    if (!rental) {
      throw new Error("There are no rentals");
    }
    res.status(200).send(rental);
  } catch (error) {
    res.status(400).send(error.message);
  }
};

//get listing according to certain conditions
const getRental = async (req, res) => {
  try {
    const data = req.body;
    const rental = await RentalDetailsModel.find(data);
    if (!rental) {
      throw new Error("listing not found");
    }
    res.status(200).send(rental);
  } catch (error) {
    res.status(400).send(error.message);
  }
};

module.exports = [
  addRental,
  updateRental,
  deleteRental,
  getAllRental,
  getRental,
];
