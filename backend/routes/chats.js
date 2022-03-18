const express = require("express");
const { protect } = require("../middleware/auth");
const router = express.Router();

router.post("/", protect, accessChats); // or creating them
router.get("/fetch", protect, fetchChats); // chats/fetch : fetch all chats
router.post("/group", protect, createGroup);
router.put("/group/rename", protect, renameGroup);
router.put("/group/remove", protect, leaveGroup);
router.put("/group/add", protect, addGroup);

module.exports = router;
