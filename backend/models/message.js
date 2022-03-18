const mongoose = require("mongoose");

const messageModel = mongoose.Schema(
  {
    sender: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "userSchema",
    },
    content: {
      type: String,
    },
    chats: { type: mongoose.Schema.Types.ObjectId, ref: "chatSchema" },
  },
  {
    timestamps: true,
  }
);

const Message = mongoose.model("messageSchema", messageModel)
module.exports = Message
