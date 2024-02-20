import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    mobile: { type: Number, required: true },
    isVerified: { type: Boolean, default: false },
  },
  { timestamps: true, versionKey: false }
);

export default new mongoose.model("User", userSchema);
