import jwt from "jsonwebtoken";
import cookieParser from "cookie-parser";
import asyncHandler from "express-async-handler";
import User from "../models/userModel";
import { NextFunction, Request, Response } from "express";

const protect = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const secret = process.env.JWT_SECRET || "SecretNotSet";
    let token = req.cookies.jwt;
    if (!token) {
      res.status(401);
      throw new Error("Unauthorized: No Token");
      return;
    }
    try {
      const decoded = jwt.verify(token, secret);
      const user = await User.findById(decoded.userId).select("-password");
      if (!user) {
        res.status(401);
        throw new Error("Unauthorized: Invalid Token");
      }
      req.user = user;
      next();
    } catch (error) {
      res.status(401).json({ message: "Unauthorized: Invalid Token" });
    }
  }
);

export { protect };
