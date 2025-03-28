const mongoose = require('mongoose');

const problemSchema = new mongoose.Schema({
  problem: { type: String, required: true },
  input: { type: String, required: true },
  output: { type: String, required: true },
});

const Problem = mongoose.model('Problem', problemSchema);
module.exports = Problem;
