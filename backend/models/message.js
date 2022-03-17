const mongoose = require("mongoose");

const messageModel = mongoose.Schema(
  {
    sender: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    content: {
      type: String,
    },
    chats: { type: mongoose.Schema.Types.ObjectId, ref: "Chats" },
  },
  {
    timestamps: true,
  }
);

const messageSchema = mongoose.model("messageSchema", messageModel)
module.exports = messageSchema
