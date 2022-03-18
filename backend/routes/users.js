const express = require("express");
const {
  signupRoute,
  loginRoute,
  fetchUsers,
} = require("../controllers/users");
const { protect } = require("../middleware/auth");
const router = express.Router();

router.post("/signup", signupRoute);
router.post("/login", loginRoute);
router.get("/fetch", protect, fetchUsers);  // users/fetch : fetch all the users

module.exports = router;
