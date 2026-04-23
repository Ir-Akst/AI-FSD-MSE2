const mongoose = require("mongoose");

const grievanceSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: String,
  category: {
    type: String,
    enum: ["Academic", "Hostel", "Transport", "Other"],
    default: "Other",
  },
  date: { type: Date, default: Date.now },
  status: {
    type: String,
    enum: ["Pending", "Resolved"],
    default: "Pending",
  },
});

module.exports = mongoose.model("Grievance", grievanceSchema);