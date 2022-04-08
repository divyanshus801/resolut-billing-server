const mongoose = require("mongoose");

const clientSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
    maxlength: 32,
  },
  
},{timestamps: true});

module.exports = mongoose.model("Client", clientSchema);
