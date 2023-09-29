import jwt from "jsonwebtoken";

export const verifyToken = (req, res, next) => {
  const authHeaders =
    req.headers["Authorization"] || req.headers["authorization"];
  req.authHeaders = authHeaders;
  if (!authHeaders) {
    return res.status(401).json("token is required");
  }
  const token = authHeaders.split(" ")[1];
  try {
    const currentToken = jwt.verify(token, process.env.JWT_SEKRET_KEY);
    req.currentToken = currentToken;
    // console.log("currentToken",currentToken)
    console.log(currentToken);
    next();
  } catch (err) {
    return res.status(401).json("invalid token");
  }
  // console.log("decodedToken",decodedToken);
  // console.log(token);
};
