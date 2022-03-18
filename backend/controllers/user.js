const asyncHandler = require("express-async-handler");
const User = require("../models/user");
const generateToken = require("./generateToken");

const signupRoute = asyncHandler(async (req, res) => {
  const { name, email, password, picture } = req.body;

  if (!name || !email || !password) {
    res.status(400);
    throw new Error("Please fill all the fields");
  }

  const userExist = await User.findOne({ email });
  if (userExist) {
    res.status(400);
    throw new Error("User already exist");
  }

  const newUser = await User.create({
    name,
    email,
    password,
    picture,
  });

  if (newUser) {
    res.status(201).json({
      _id: newUser.id,
      email: newUser.email,
      picture: newUser.pic,
      token: generateToken(newUser._id),
    });
  } else {
    res.status(400);
    throw new Error("Signup failed");
  }
});

const loginRoute = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    res.status(400);
    throw new Error("Please fill all the fields");
  }

  const userExist = await User.findOne({ email });
  if (userExist && (await userExist.matchPasswords(password))) {
    res.status(201).json({
      _id: userExist.id,
      name: userExist.name,
      email: userExist.email,
      picture: userExist.picture,
      token: generateToken(userExist._id),
    });
  } else {
    res.status(400);
    throw new Error("Login failed");
  }
});

const getAllUsers = asyncHandler(async (req, res) => {
  const keyword = req.query.search
    ? {
        $or: [
          { name: { $regex: req.query.search, $options: "i" } },
          { email: { $regex: req.query.search, $options: "i" } },
        ],
      }
    : {};
  const allUsers = await User.find(keyword).find({
    _id: { $ne: req.user._id },
  });
  res.send(allUsers);
});

module.exports = { signupRoute, loginRoute, getAllUsers };
