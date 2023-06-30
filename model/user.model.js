const mongoose = require("mongoose");

const userModelSchema = new mongoose.Schema({
  name: {
    type: "string",
    required: true,
    trim: true,
  },
  email: {
    type: "string",
    required: true,
    trim: true,
    unique: true,
    lowercase: true,
  },
  password: {
    type: "string",
    trim: true,
    required: true,
  },
  contact: {
    type: "string",
    required: true,
    trim: true,
  },
  isAdmin: { type: "boolean", default: false },
});
const UserModel = mongoose.model("User", userModelSchema);

module.exports = UserModel;
