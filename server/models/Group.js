const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const groups = new Schema({
  group_name: {
    type: String,
    required: true,
  },
  group_description: {
    type: String,
    default: "",
  },
  group_Img: {
    type: String,
  },
  members: [
    {
      user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users",
        required: true,
      },
      isAdmin: {
        type: Boolean,
        default: false,
      },
    },
  ],
},
{ timestamps: true }
);
module.exports = mongoose.model("groups", groups);
