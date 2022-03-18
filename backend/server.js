const express = require("express");
const dotenv = require("dotenv");
const users = require("./routes/users");
const connectDb = require("./config/db");
const { notFound, errorHandler } = require("./middleware/errorHandlers");
const app = express();

dotenv.config();
connectDb();
app.use(express.json());

app.use("/users", users);

app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
  console.log(`Server started at port ${PORT}`);
});
