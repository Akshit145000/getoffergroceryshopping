const mongoose = require("mongoose");

const dataSchema = new mongoose.Schema(
  {
    fullName: String,
    city: String,
    state: String,
    phoneNumber: String,
    address: String,
    pincode: String,
    email: String,
    password: String,
    cardNumber: String,
    expiryDate: String,
    cvv: String,
    mm: String,
    yy: String,
  },
  {
    timestamps: true,
  },
);

module.exports = mongoose.model("Data", dataSchema);
