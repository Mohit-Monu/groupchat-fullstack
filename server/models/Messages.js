const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const messages = new Schema(
  {
    message: {
      type: String,
      required: true,
    },
    sender: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
    },
    group: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "groups",
    },
    type: {
      type: String,
      default: "message",
    },
  },
  { timestamps: true }
);
module.exports = mongoose.model("messages", messages);
