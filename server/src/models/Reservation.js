import mongoose from "mongoose";

const reservationSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, "User is required"],
    },

    property: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Property",
      required: [true, "Property is required"],
    },

    message: {
      type: String,
      trim: true,
      maxlength: [500, "Message cannot exceed 500 characters"],
      default: "",
    },

    status: {
      type: String,
      enum: {
        values: ["pending", "accepted", "rejected", "cancelled"],
        message: "Invalid reservation status",
      },
      default: "pending",
    },
  },
  {
    timestamps: true,
  },
);

/*
|--------------------------------------------------------------------------
| Indexes
|--------------------------------------------------------------------------
*/

reservationSchema.index({ user: 1 });
reservationSchema.index({ property: 1 });
reservationSchema.index({ status: 1 });

const Reservation = mongoose.model("Reservation", reservationSchema);

export default Reservation;
