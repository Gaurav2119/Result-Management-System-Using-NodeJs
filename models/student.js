//importing mongoose
const mongoose = require("mongoose")
// schema represents the structure of a particular document
// Each schema maps to a MongoDB collection
const { Schema } = mongoose;

//Student schema
const studentSchema = new Schema({
  roll: {
    type: Number,
    unique: [true, "Roll no. already exists"],
    required: [true, "Enter Roll no."]
  },
  name: {
    type: String,
    required: [true, "Enter Student Name"]
  },
  dob: {
    type: Date,
    required: [true, "Enter Date of Birth"]
  },
  score: {
    type: Number,
    required: [true, "Enter Student Score"]
  }
});

//exporting the model
// A model defines a programming interface for interacting with the database (read, insert, update, etc).
module.exports = mongoose.model("Student", studentSchema)