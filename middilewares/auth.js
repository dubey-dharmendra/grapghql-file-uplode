import { GraphQLError } from "graphql";
import jwt from "jsonwebtoken";

export const verifyToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  if (!token) throw new GraphQLError("You are not logged In");
  let userinfo = null;
  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (error, user) => {
    if (error) {
      throw new GraphQLError("Invalid Token");
    } else {
      userinfo = user;
      next();
    }
  });
  // return userinfo;
};

// const getUser = async (token) => {
//   try {
//     if (token) {
//       const user = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
//       return user;
//     }
//     return null;
//   } catch (error) {
//     return null;
//   }
// };

// const context = async ({ req, res }) => {
//   if (req.body.operationName === "IntrospectionQuery") {
//     // console.log('blocking introspection query..');
//     return {};
//   }
//   console.log("req------->", req.body);
//   console.log("req------->", req.headers.token);
//   // allowing the 'CreateUser' and 'Login' queries to pass without giving the token
//   if (
//     req.body.operationName === "createUser" ||
//     req.body.operationName === "loginUser"
//   ) {
//     return {};
//   }

//   // get the user token from the headers
//   const token = req.headers.token || "";
//   if (!token) throw new GraphQLError("You are not logged In");
//   // try to retrieve a user with the token
//   const user = await getUser(token);

//   if (!user) {
//     throw new GraphQLError("Invalid Token");
//   }

//   // add the user to the context
//   return { user };
// };

// module.exports = context;
