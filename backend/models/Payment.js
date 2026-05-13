const mongoose = require("mongoose");

const paymentSchema = new mongoose.Schema(
  {
    reservation: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Reservation",
    },

    amount: {
      type: Number,
      required: true,
    },

    method: {
      type: String,
      default: "Carte",
    },

    status: {
      type: String,
      default: "Payé",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Payment", paymentSchema);