const mongoose = require("mongoose");

const lawyerSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
    maxlength: 32,
  },
  
},{timestamps: true});

module.exports = mongoose.model("Lawyer", lawyerSchema);
