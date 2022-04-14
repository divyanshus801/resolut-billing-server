const mongoose = require("mongoose");
const {ObjectId} = mongoose.Schema;

const matterSchema = new mongoose.Schema(
  {
    client: {
      type: ObjectId,
      ref: "Client",
      required: true
  },
    name: {
      type: String,
      trim: true,
      required: true,
      maxlength: 32,
      unique: true,
    },
    resourceSpecificPrice: {
      type: Array,
    },
    pricePerHour: {
      type: mongoose.Types.Decimal128,
      
    },
    engagementLetter: {
      data: Buffer,
      contentType: String,
    }
   
  },
  { timestamps: true }
);

module.exports = mongoose.model("Matter", matterSchema);
