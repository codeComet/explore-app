import jwt from "jsonwebtoken";
import UserModel from "../models/user.js";

const secret = "exploreapp";

const auth = async (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const isCustomToken = token.length < 500;
    let decodedData;
    if (token && isCustomToken) {
      decodedData = jwt.verify(token, secret);
      req.userId = decodedData?.id;
    } else {
      decodedData = jwt.decode(token);
      const googleId = decodedData?.sub;
      const user = await UserModel.findOne({ googleId });
      req.userId = user?._id;
    }
    next();
  } catch (error) {
    res.status(401).json({ message: "You've been logged out" });
  }
};

export default auth;
