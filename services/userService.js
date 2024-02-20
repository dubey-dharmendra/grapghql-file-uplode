import User from "../models/userModel.js";
import Otp from "../models/otpModel.js";

const createUser = async (data) => {
  return await User.create(data);
};

const getUsers = async () => {
  return await User.find();
};

const findByEmail = async (email) => {
  return await User.findOne({ email });
};

const saveOtp = async (user, g_otp) => {
  return await Otp.findOneAndUpdate(
    { user_id: user.id },
    { otp: g_otp, timestamp: Date.now },
    { new: true, upsert: true, setDefaultsOnInsert: true }
  );
};

// exports.verifyOtp = async (id) => {
//   const getOtpData = await Otp.findById(id);
//   if (getOtpData) await User.f
// };

export default { createUser, getUsers, saveOtp, findByEmail };
