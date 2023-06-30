const UserModel = require("../../model/user.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

async function hashPassword(plaintextPassword) {
  const hash = await bcrypt.hash(plaintextPassword, 10);
  return hash;
}

async function comparePassword(plaintextPassword, hash) {
  const result = await bcrypt.compare(plaintextPassword, hash);
  return result;
}

const register = async (req, res) => {
  try {
    let data = req?.body;
    data.password = await hashPassword(data.password); // hashing the password
    //saving the data into database
    const newUser = new UserModel(data);
    await newUser.save();
    res.status(200).send("Done");
  } catch (error) {
    res.status(500).send(error?.message || "Something went Wrong");
  }
};

const login = async (req, res) => {
  try {
    let data = req?.body;
    const user = await UserModel.findOne({ email: data?.email }); //searching in database
    if (!user) {
      throw new Error("User not found");
    }
    const pw = await comparePassword(data?.password, user?.password); // comparing the password
    if (!pw) {
      throw new Error("Incorrect Password");
    }

    const token = jwt.sign(
      { id: user._id, name: user.name, isAdmin: user.isAdmin },
      "secret"
    ); // creating a token

    res.status(200).send({ token, isAdmin: user.isAdmin });
  } catch (error) {
    res.status(400).send(error?.message || "Something went Wrong");
  }
};

const findAll = async (req, res) => {
  try {
    const users = await UserModel.find({ isAdmin: false });
    if (!users) {
      throw new Error("There are no users");
    }

    res.status(200).send(users);
  } catch (error) {
    res.status(400).send(error.message);
  }
};
const deleteUser = async (req, res) => {
  try {
    const { id } = req?.body;

    const users = await UserModel.findByIdAndDelete(id);

    res.status(200).send("User deleted successfully");
  } catch (error) {
    res.status(400).send(error.message);
  }
};

const findById = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await UserModel.findById(id);
    if (!user) {
      throw new Error("User not found");
    }
    res.status(200).send(user);
  } catch (error) {
    res.status(400).send(error.message);
  }
};

const update = (req, res) => {};

module.exports = [register, login, findById, findAll, deleteUser, update];
