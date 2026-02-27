const mongoose = require("mongoose");

const adminLogin = new mongoose.Schema({
  email: String,
  password: String,
});

module.exports = mongoose.model("AdminLogin", adminLogin);
