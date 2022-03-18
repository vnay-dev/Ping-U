const asyncHandler = require("express-async-handler");
const User = require("../models/user");

const signupRoute = asyncHandler(async (req, res) => {
  const { name, email, password, pic } = req.body;

  if (!name || !email || !password || !pic) {
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
    pic,
  });

  if (newUser) {
    res.status(201).json({
      _id: newUser.id,
      email: newUser.email,
      pic: newUser.pic,
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
      pic: userExist.pic,
      token: generateToken(userExist._id),
    });
  } else {
    res.status(400);
    throw new Error("Login failed");
  }
});

module.exports = { signupRoute, loginRoute };
