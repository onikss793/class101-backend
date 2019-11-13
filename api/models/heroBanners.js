const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const heroBanner = new Schema({
  _id: { type: String, ref: "Product", uniue: true },
  title: String,
  description: String,
  backgroundColor: String,
  imageUrl: String,
  score: Number,
  shortTitle: String
});

module.exports = mongoose.model("HeroBanner", heroBanner);
