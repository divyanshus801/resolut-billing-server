const mongoose = require("mongoose");

const clientSchema = new mongoose.Schema({
  clientName: {
    type: String,
    required: true,
    trim: true,
    maxlength: 32,
  },
  clientAddress: {
    type: String,
    trim: true
  }
  
},{timestamps: true});

module.exports = mongoose.model("Client", clientSchema);
