const mongoose = require("mongoose");

const messageModel = mongoose.Schema(
  {
    sender: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
    },
    content: {
      type: String,
    },
    chats: { type: mongoose.Schema.Types.ObjectId, ref: "chats" },
  },
  {
    timestamps: true,
  }
);

const Message = mongoose.model("messages", messageModel);
module.exports = Message;
