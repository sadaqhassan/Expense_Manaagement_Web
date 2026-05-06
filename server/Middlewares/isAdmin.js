import jwt from "jsonwebtoken";
import { User } from "../Models/user.model.js";

export const isAuth  = async (req, res, next) => {
  const token = req.cookies.accessToken;

  if (!token) {
    return res.status(401).json({ success: false, message: "Unauthorized" });
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const getUser = await User.findById(decoded.userId);

    if (!getUser) {
      return res.status(404).json({ success: false, message: "User not found" });
    }
    
    req.userId = decoded.userId;
    
    next();
  } catch (error) {
    return res.status(500).json({ success: false, message: "Internal Server Error"+error.message });
    console.log("Error in authentication middleware:", error);
  }
}


export const isAdmin = async (req, res, next) => {
  try {

    const user = await User.findById(req.userId);
    if (user && user.role !== "admin") {
        return res.status(403).json({ success: false, message: "Forbidden" });
    }

    next();
  }
  catch (error) {
    return res.status(500).json({ success: false, message: "Server error"+error.message });
    console.log("Error in admin middleware:", error);
  }
}   