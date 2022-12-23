// require("./createseats");
require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");

const app = express();

const mongo_database = process.env.MONGO_REMOTE;

mongoose
  .connect(`${mongo_database}`, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log(err));

const seatsRouter = require("./routes/seats");
app.use("/seats", seatsRouter);

const PORT = process.env.PORT || 3000;

app.listen(PORT, function () {
  console.log(`The server is running on port ${PORT}.`);
});
