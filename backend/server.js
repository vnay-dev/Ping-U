const express = require("express");
const dotenv = require("dotenv");
const app = express();

dotenv.config();
const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
  console.log(`Server started at port ${PORT}`);
});
