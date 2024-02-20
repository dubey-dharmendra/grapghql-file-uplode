import jwt from "jsonwebtoken";
import { GraphQLError } from "graphql";

import userServices from "../../services/userService.js";
import { verifyToken } from "../../middilewares/auth.js";
import sendEmail from "../../helper.js/sendEmail.js";
import fs from "fs";
import path from "path";

const g_otp = Math.floor(100000 + Math.random() * 900000);

const queries = {
  getAllUser: async (_, args, context) => {
    try {
      // const signedUser = verifyToken(context.token);
      // if (signedUser) {
      // }
      const getUsers = await userServices.getUsers();
      if (!getUsers) throw new GraphQLError("getAllUser Failed");
      return getUsers;
    } catch (error) {
      throw new GraphQLError(error.message);
    }
  },
};
const mutations = {
  createUser: async (_, { input }) => {
    try {
      const insertedUser = await userServices.createUser(input);
      if (!insertedUser) throw new GraphQLError("insertion Failed");

      const saveOtpToDb = await userServices.saveOtp(insertedUser, g_otp);

      if (saveOtpToDb) {
        const mailedID = await sendEmail(insertedUser, g_otp);
        if (mailedID) return "Email has been sent on your register Email-Id";
      }
    } catch (error) {
      throw new GraphQLError(error.message);
    }
  },
  loginUser: async (_, { input }) => {
    try {
      const { email, password } = input;

      if (email && password) {
        let userInfo = await userServices.findByEmail(email);
        if (userInfo) {
          if (password === userInfo.password) {
            const token = jwt.sign(
              { _id: userInfo._id, email: userInfo.email },
              process.env.ACCESS_TOKEN_SECRET,
              { expiresIn: process.env.TOKEN_EXPIREIN }
            );
            userInfo.token = token;
            return userInfo;
          } else throw new GraphQLError("Invalid credintials ");
        } else throw new GraphQLError("User Doesn't Exist ");
      }
    } catch (error) {
      throw new GraphQLError(error.message);
    }
  },
  verifyOtp: async (_, { input }) => {
    const { _id, otp } = input;
    const verifedOtp = await userServices.verifyOtp(_id);
    if (verifedOtp) {
    }
  },
  singleUpload: async (_, { file }) => {
    console.log(await file);
    const { createReadStream, filename, mimetype } = await file;
    const location = path.join(process.cwd(), `public/images/${filename}`);
    const myfile = createReadStream();
    await myfile.pipe(fs.createWriteStream(location));
    return "file-uploaded successfully";
  },
};

export default { queries, mutations };
