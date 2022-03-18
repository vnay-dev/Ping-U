const asyncHandler = require("express-async-handler");
const Users = require("../models/user");
const Chats = require("../models/chats");

const accessChats = asyncHandler(async (req, res) => {
  // responsible for creating or fetching a one-one chat
  const { userId } = req.body; // this is the id of the other person
  if (!userId) {
    console.log("User ID param not found in request");
    return res.sendStatus(400);
  }
  // finding the chat if it exist
  var chatExist = await Chats.find({
    isGroupChat: false,
    $and: [
      { users: { $elemMatch: { $eq: req.user._id } } },
      { users: { $elemMatch: { $eq: userId } } },
    ],
  })
    .populate("users", "-password")
    .populate("latestMessage");

  chatExist = await Users.populate(chatExist, {
    path: "latestMessage.sender",
    select: "name picture email",
  });

  if (chatExist.length > 0) {
    res.send(chatExist[0]);
  } else {
    var chatData = {
      chatName: "sender",
      isGroupChat: false,
      users: [req.user._id, userId],
    };
    try {
      const newChat = await Chats.create(chatData);
      const fullChat = await Chats.findOne({ _id: newChat._id }).populate(
        "users",
        "-password"
      );
      res.status(200).json(fullChat);
    } catch (error) {
      res.status(400);
      throw new Error(error.message);
    }
  }
});

const fetchChats = asyncHandler(async (req, res) => {
  // return all the chats that the user is a part of
  try {
    Chats.find({ users: { $elemMatch: { $eq: req.user._id } } })
      .populate("users", "-password")
      .populate("groupAdmin", "-password")
      .populate("latestMessage")
      .sort({ updatedAt: -1 })
      .then(async (results) => {
        results = await Users.populate(results, {
          path: "latestMessage.sender",
          select: "name picture email",
        });
        res.send(results);
      }); // sort from new to old
  } catch (error) {
    res.status(400);
    throw new Error(error.message);
  }
});

const createGroup = asyncHandler(async (req, res) => {
  // takes in name of the group and array of users
  const { name, users } = req.body;
  if (!name || !users) {
    return res.send(400).send({ message: "Please fill all the fields" });
  }
  // we send the array after stringify from the frontend
  // hence we need to parse it in the backend
  var userArr = JSON.parse(users);

  // min 2 users needed for a group
  if (userArr.length < 2) {
    return res.status(400).send("Minimum 2 users are neeeded for a group chat");
  }

  userArr.push(req.user);
  try {
    const groupChat = await Chats.create({
      chatName: req.body.name,
      users: userArr,
      isGroupChat: true,
      groupAdmin: req.user,
    });

    const fullChat = await Chats.findOne({
      _id: groupChat._id,
    })
      .populate("users", "-password")
      .populate("groupAdmin", "-password");
    res.status(200).json(fullChat);
  } catch (error) {
    res.status(400);
    throw new Error(error.message);
  }
});

const renameGroup = asyncHandler(async (req, res) => {
  const { chatId, chatName } = req.body;
  const updatedChat = await Chats.findByIdAndUpdate(
    chatId,
    {
      chatName, // because the key name and the query are same
    },
    {
      new: true, // if not mentioned, old chat name gets sent back to us
    }
  )
    .populate("users", "-password")
    .populate("groupAdmin", "-password");
  if (!updatedChat) {
    res.status(404);
    throw new Error("Chat not found");
  } else {
    res.json(updatedChat);
  }
});

const addToGroup = asyncHandler(async (req, res) => {
  const { chatId, userId } = req.body; // to add user with userId to chat with chatId
  const addToGroupChat = await Chats.findByIdAndUpdate(
    chatId,
    {
      $push: { users: userId },
    },
    { new: true }
  )
    .populate("users", "-password")
    .populate("groupAdmin", "-password");
  if (!addToGroupChat) {
    res.status(404);
    throw new Error("Chat not found");
  } else {
    res.json(addToGroupChat);
  }
});

const leaveGroup = asyncHandler(async (req, res) => {
  const { chatId, userId } = req.body; // to remove user with userId from chat with chatId
  const removeFromChat = await Chats.findByIdAndUpdate(
    chatId,
    {
      $pull: { users: userId },
    },
    { new: true }
  )
    .populate("users", "-password")
    .populate("groupAdmin", "-password");
  if (!removeFromChat) {
    res.status(404);
    throw new Error("Chat not found");
  } else {
    res.json(removeFromChat);
  }
});

module.exports = {
  accessChats,
  fetchChats,
  createGroup,
  renameGroup,
  addToGroup,
  leaveGroup,
};
