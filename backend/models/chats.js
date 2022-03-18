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
        ref: "userSchema",
      },
    ],
    groupAdmin: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "userSchema",
    },
    latestMessage: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "messageSchema",
    },
  },
  {
    timestamps: true,
  }
);

const Chats = mongoose.model("chatSchema", chatModel);
module.exports = Chats;
