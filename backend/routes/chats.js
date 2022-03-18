const express = require("express");
const {
  accessChats,
  fetchChats,
  createGroup,
  renameGroup,
  leaveGroup,
  addToGroup,
} = require("../controllers/chats");
const { protect } = require("../middleware/auth");
const router = express.Router();

router.post("/", protect, accessChats); // or creating them (one-one)
router.get("/fetch", protect, fetchChats); // chats/fetch : fetch all chats (one-one)
router.post("/group", protect, createGroup);
router.put("/group/rename", protect, renameGroup);
router.put("/group/remove", protect, leaveGroup);
router.put("/group/add", protect, addToGroup);

module.exports = router;
