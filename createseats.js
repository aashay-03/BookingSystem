const mongoose = require("mongoose");

const mongo_database = process.env.MONGO_REMOTE;

mongoose.connect(`${mongo_database}`, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const Seat = require("./models/Seat");

for (let i = 1; i <= 500; i++) {
  const seat = new Seat({
    seatNumber: i,
  });
  seat.save((err) => {
    if (err) {
      console.error(err);
    }
  });
}

mongoose.disconnect();
