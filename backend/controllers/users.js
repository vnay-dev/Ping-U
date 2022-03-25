const asyncHandler = require("express-async-handler");
const Message = require("../models/message");
const Users = require("../models/user");
const generateToken = require("./generateToken");

const signupRoute = asyncHandler(async (req, res) => {
  let { name, email, password, picture } = req.body;

  if (!name || !email || !password) {
    res.status(400);
    throw new Error("Please fill all the fields");
  }

  const userExist = await Users.findOne({ email });
  if (userExist) {
    res.status(400);
    throw new Error("User already exist");
  }

  if (picture === "") {
    picture = process.env.DEFAULT_PIC;
  }

  const newUser = await Users.create({
    name,
    email,
    password,
    picture,
  });

  if (newUser) {
    res.status(201).json({
      _id: newUser.id,
      email: newUser.email,
      picture: newUser.picture,
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
  const userExist = await Users.findOne({ email });
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

const fetchUsers = asyncHandler(async (req, res) => {
  const keyword = req.query.search
    ? {
        $or: [
          { name: { $regex: req.query.search, $options: "i" } },
          { email: { $regex: req.query.search, $options: "i" } },
        ],
      }
    : {};
  const allUsers = await Users.find(keyword).find({
    _id: { $ne: req.user._id },
  });
  res.send(allUsers);
});

// const addNotification = asyncHandler(async (req, res) => {
//   const newMessageRecieved = req.body.newMessage;
//   if (!newMessageRecieved) {
//     console.log("New message not found in request");
//     return res.sendStatus(400);
//   }

//   const addNewNotification = await Users.findByIdAndUpdate(req.user._id, {
//     $push: { notifications: newMessageRecieved },
//   }).exec();

//   if (!addNewNotification) {
//     res.status(404);
//     throw new Error("Notification not added");
//   } else {
//     res.json(addNewNotification);
//   }
// });

// const deleteNotification = asyncHandler(async (req, res) => {
//   const newMessageRecieved = req.body.newMessage;
//   if (!newMessageRecieved) {
//     console.log("New message not found in request");
//     return res.sendStatus(400);
//   }

//   const removeNotification = await Users.findByIdAndUpdate(req.user._id, {
//     $pull: { notifications: newMessageRecieved._id },
//   }).exec();

//   if (!removeNotification) {
//     res.status(404);
//     throw new Error("Notification not removed");
//   } else {
//     res.json(removeNotification);
//   }
// });

module.exports = {
  signupRoute,
  loginRoute,
  fetchUsers,
  // addNotification,
  // deleteNotification,
};
