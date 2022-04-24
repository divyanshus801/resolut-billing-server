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
    engagementLetter: {
      data: Buffer,
      contentType: String,
    },
    resourceSpecificPrice: {
      type: [
        { type: String}
      ],
    },
    pricePerHour: {
      type: mongoose.Types.Decimal128,
      
    }
  
  },
  { timestamps: true }
);

module.exports = mongoose.model("Matter", matterSchema);
