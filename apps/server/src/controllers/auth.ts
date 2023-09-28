import { Request, Response } from "express";
import { genToken, register as registerService } from "../services/auth";
import User, { IUser } from "../models/User";

export const register = async (req: Request, res: Response) => {
  const { firstName, lastName, username, password } = req.body;
  if (!username || !password || !firstName || !lastName) {
    res.status(401).json({ message: "Missing fields" });
    return;
  }
  try {
    const token = await registerService(
      firstName,
      lastName,
      username,
      password
    );
    res.status(200).json(token);
  } catch (e: any) {
    res.status(401).json({ message: e.message });
  }
};

export const login = async (req: Request, res: Response) => {
  const { username, password } = req.body;
  if (!username || !password) {
    res.status(401).json({ message: "Missing username or password" });
    return;
  }
  try {
    const user = await User.findOne({ username }).exec();
    if (!user || user.password != password) {
      res.status(401).json({ message: "Invalid username or password" });
      return;
    }
    const token = genToken(username);
    // console.log({ token });
    res.status(200).json({ token });
  } catch (e) {
    console.error("Error during login:", e);
    res.status(500).json({ msg: "Login failed" });
  }
};

export const getUser = async (req: Request, res: Response) => {
  const userId = (req as any).userId;
  try {
    const { firstName, lastName, username } = await User.findById(
      userId
    ).exec();
    res.status(200).json({ firstName, lastName, username });
  } catch (e) {
    console.error("Error during getUser:", e);
    res.status(500).json({ msg: "Failed to get user" });
  }
};

// export const me = async (req: Request, res: Response) => {
//   const { username, password } = req.body;
//   if(!username || !password) {
//     res.status(401).json({ message: "Missing username or password" });
//     return;
//   }
//   try {
//     const user = await findOne()
//   } catch(e) {
//     console.error("Error /me:", e);
//     res.sendStatus(500);
//   }
// }
