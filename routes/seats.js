const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();
const Seat = require("../models/seat");

router.get("/available", (req, res) => {
  Seat.find({ status: "available" }, (err, seats) => {
    if (err) {
      return res.status(500).send(err);
    }
    const availableSeats = [];
    for (let i = 0; i < seats.length; i++) {
      availableSeats.push(seats[i].seatNumber);
    }
    return res.status(200).send(
      availableSeats.sort(function (a, b) {
        return a - b;
      })
    );
  });
});

router.post("/:seatId/book", async (req, res) => {
  const session = await mongoose.startSession();
  session.startTransaction();
  try {
    const seat = await Seat.findOne({
      seatNumber: req.params.seatId,
      status: "available",
    }).session(session);
    if (!seat) {
      res.status(404).send({ error: "Seat already booked" });
      return;
    }
    seat.status = "booked";
    await seat.save({ session });
    await session.commitTransaction();
    res.send({ message: "Seat booked successfully" });
  } catch (error) {
    await session.abortTransaction();
    res.status(500).send({ error: "Error booking seat" });
  } finally {
    session.endSession();
  }
});

module.exports = router;
