const mongoose = require("mongoose");

const SeatSchema = new mongoose.Schema({
  seatNumber: {
    type: Number,
    required: true,
    unique: true,
  },
  status: {
    type: String,
    enum: ["available", "booked"],
    default: "available",
  },
});

const Seat = mongoose.model("Seat", SeatSchema);

module.exports = Seat;