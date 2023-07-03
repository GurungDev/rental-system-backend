const ListingModel = require("../model/listing.model");
const RentalModel = require("../model/rental.model");
const UserModel = require("../model/user.model");

const allCount = async (req, res, next) => {
  try {
    const userCount = await UserModel.countDocuments();
    const listingCount = await ListingModel.countDocuments();
    const rentalCount = await RentalModel.countDocuments();
    if (!userCount) {
      throw new Error("User Count Not Foound");
    }
    if (!listingCount) {
      throw new Error("Listing Count Not Foound");
    }
    if (!rentalCount) {
      throw new Error("Rental Count Not Foound");
    }
    res.status(200).send({ userCount, listingCount, rentalCount });
  } catch (error) {
    res.status(400).send(error.message);
  }
};

module.exports = allCount;
