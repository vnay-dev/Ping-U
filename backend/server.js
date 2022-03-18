const express = require("express");
const dotenv = require("dotenv");
const userRoutes = require("./routes/users");
const chatRoutes = require("./routes/chats");
const connectDb = require("./config/db");
const { notFound, errorHandler } = require("./middleware/errorHandlers");
const app = express();

dotenv.config();
connectDb();
app.use(express.json());

app.use("/users", userRoutes);
app.use("/chats", chatRoutes);

app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
  console.log(`Server started at port ${PORT}`);
});
