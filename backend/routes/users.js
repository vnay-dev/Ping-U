const express = require("express");
const { signupRoute, loginRoute, getAllUsers } = require("../controllers/user");
const { protect } = require("../middleware/auth");
const router = express.Router();

router.post("/signup", signupRoute);
router.post("/login", loginRoute);
router.get("/getall", protect, getAllUsers);

module.exports = router;
