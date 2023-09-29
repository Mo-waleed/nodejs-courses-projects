import { blackListToken } from "../models/blackList.model.js";
import { SUCCESS, FAIL, ERROR } from "../utlies/httpStatus.js";
import { User } from "../models/users.model.js";

export const isTokenBlacklisted = async (req, res, next) => {
  const token = req.headers["Authorization"] || req.headers["authorization"];
  // const token = authHeaders.split(' ')[1];
  // let token = req.headers.authorization;

  // Check if the token is blacklisted in the database
  const isTokenBlacklisted = await blackListToken.exists({ token });

  if (isTokenBlacklisted) {
    // Token is blacklisted, deny access
    res.status(401).json({ error: "Invalid token or expired session" });
    return;
  }
  try {
    next();
  } catch (err) {
    return res.status(400).json("ERRRRRRRROR");
  }
  //  else {
  //     // Token is valid, continue processing the request
  //     // res.json({ message: 'Access granted' });
  //   const users = await User.find({}, { "__v": false, "password": false })

  //     return res.status(201).json({ status: SUCCESS, data: { users } });

  //   }
};
