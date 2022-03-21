const express = require("express");
const { protect } = require("../middleware/auth");
const router = express.Router();

//router.post("/", protect, sendMessage);
//router.get("/:chatId", protect, fetchMessages); // fetch all messages w.r.t chatId

module.exports = router;
