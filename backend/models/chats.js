const mongoose = require("mongoose");

const chatModel = mongoose.Schema(
  {
    chatName: {
      type: String,
      trim: true,
    },
    isGroupChat: {
      type: Boolean,
    },
    users: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users",
      },
    ],
    groupAdmin: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
    },
    latestMessage: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "messages",
    },
  },
  {
    timestamps: true,
  }
);

const Chats = mongoose.model("chats", chatModel);
module.exports = Chats;
