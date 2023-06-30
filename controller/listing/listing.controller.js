const ListingModel = require("../../model/listing.model");

const addListing = async (req, res) => {
  try {
    const {
      name,
      price_per_hour,
      price_per_day,
      contact,
      address,
      quantity,
      details,
      image,
      type,
    } = req?.body;

    //saving the data into database
    const newUser = new ListingModel({
      name,
      price_per_hour,
      price_per_day,
      contact,
      address,
      quantity,
      details,
      type,
      image,
    });
    await newUser.save();
    res.status(200).send("listing has been added");
  } catch (error) {
    res.status(400).send(error.message);
  }
};

const updateListing = async (req, res) => {
  try {
    console.log("done4");
  } catch (error) {
    res.status(400).send(error.message);
  }
};

const deleteListing = async (req, res) => {
  try {
    const { id } = req?.body;

    const listing = await ListingModel.findByIdAndDelete(id);
    res.status(200).send("listing deleted successfully");
  } catch (error) {
    res.status(400).send(error.message);
  }
};

const getAllListing = async (req, res) => {
  try {
    const listing = await ListingModel.find();
    if (!listing) {
      throw new Error("There are no listing");
    }
    res.status(200).send(listing);
  } catch (error) {
    res.status(400).send(error.message);
  }
};

//get listing according to certain conditions
const getListing = async (req, res) => {
  try {
    const data = req?.query;

    const listing = await ListingModel.find(data, {
      details: 1,
      image: 1,
      name: 1,
    });
    if (!listing) {
      throw new Error("listing not found");
    }

    res.status(200).send(listing);
  } catch (error) {
    res.status(400).send(error.message);
  }
};

//get listing details
const getListingDetails = async (req, res) => {
  try {
    const data = req?.query;

    const listing = await ListingModel.findById(data.id);
    if (!listing) {
      throw new Error("listing not found");
    }
    res.status(200).send(listing);
  } catch (error) {
    res.status(400).send(error.message);
  }
};

module.exports = [
  addListing,
  updateListing,
  deleteListing,
  getAllListing,
  getListing,
  getListingDetails,
];
