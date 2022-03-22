const asyncHandler = require("express-async-handler");
const Chats = require("../models/chats");
const Message = require("../models/message");
const Users = require("../models/user");

const sendMessage = asyncHandler(async (req, res) => {
  const { content, chatId } = req.body;

  if (!content || !chatId) {
    console.log("Invalid request data");
    return res.sendStatus(400);
  }

  const newMessage = {
    sender: req.user._id,
    content: content,
    chats: chatId,
  };

  try {
    var message = await Message.create(newMessage);
    message = await message.populate("sender", "name picture");
    message = await message.populate("chats");
    message = await Users.populate(message, {
      path: "chats.users",
      select: "name picture email",
    });
    await Chats.findByIdAndUpdate(req.body.chatId, {
      latestMessage: message,
    });
    res.json(message);
  } catch (error) {
    res.status(400);
    throw new Error(error.message);
  }
});

const fetchMessages = asyncHandler(async (req, res) => {
  try {
    const messages = await Message.find({ chats: req.params.chatId })
      .populate("sender", "name picture email")
      .populate("chats");
    res.json(messages);
  } catch (error) {
    res.status(400);
    throw new Error(error.message);
  }
});

module.exports = { sendMessage, fetchMessages };
