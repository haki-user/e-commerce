import express, { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import User from "../models/User";

const { JWT_SECRET } = process.env;
if (!JWT_SECRET) {
  console.error("Jwt secret missing");
  process.exit(1);
}

const auth = async (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;
  const token = authHeader?.split(" ")[1];
  // console.log(token);
  if (!token) {
    return res.status(401).json({ message: "No token, authorization denied" });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET) as { username: string };
    const user = await User.findOne({ username: decoded.username });
    if (!user) {
      return res.sendStatus(401);
    }
    (req as any).userId = user._id;
    next();
  } catch (e) {
    res.status(401).json({ message: "Token is not valid" });
  }
};

export default auth;
