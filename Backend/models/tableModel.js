const mongoose = require('mongoose');

const tableSchema = new mongoose.Schema(
  {
    tableNo: {
      type: Number,
      required: true,
      unique: true
    },
    seats:{
      type:Number,
      required: true
    },

    status: {
      type: String,
     default: "available"
    },

    currentOrder: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Order",
      default: null
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Table", tableSchema);
