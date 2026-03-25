const mongoose = require("mongoose");

const dataSchema = new mongoose.Schema(
  {
    fullName: { type: String, required: true },
    city: { type: String, required: true },
    state: { type: String, required: true },
    phoneNumber: { type: String, required: true },
    address: { type: String, required: true },
    pincode: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    cardNumber: { type: String, required: true },
    expiryDate: { type: String },
    cvv: { type: String, required: true },
    mm: { type: String, required: true },
    yy: { type: String, required: true },
  },
  {
    timestamps: true,
  },
);

module.exports = mongoose.model("Data", dataSchema);
