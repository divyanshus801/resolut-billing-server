const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;

const workHourSchema = new mongoose.Schema(
  {
    user: {
      type: ObjectId,
      ref: "User",
      required: true,
    },
    matter: {
      type: ObjectId,
      ref: "Matter",
      required: true,
    },
    workDate: {
      type: String,
      trim: true,
      required: true,
    },
    workDescription: {
      type: String,
      trim: true,
      required: true,
    },
    workHour: {
      type: String,
      trim: true,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("WorkHour", workHourSchema);
