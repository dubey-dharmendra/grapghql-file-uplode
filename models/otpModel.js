import mongoose from "mongoose";

const otpSchema = new mongoose.Schema(
  {
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    otp: { type: Number, required: true },
    timestamps: {
      type: Date,
      default: Date.now(),
      set: (timestamps) => new Date(timestamps),
      get: (timestamps) => timestamps.getTime(),
    },
  },
  { versionKey: false }
);

export default new mongoose.model("Otp", otpSchema);
