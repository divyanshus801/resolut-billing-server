const mongoose = require("mongoose");
const {ObjectId} = mongoose.Schema;

const matterSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      required: true,
      maxlength: 32,
      unique: true,
    },
    pricePerHour: {
      type: mongoose.Types.Decimal128,
      required: true,
    },
    engagementLetter: {
      data: Buffer,
      contentType: String,
    },
    client: {
        type: ObjectId,
        ref: "Client",
        required: true
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Matter", matterSchema);
