import { Request, Response, NextFunction } from "express";
import { Database } from "../models/base/Database";
import User from "../models/User";
import Condition from "../models/base/Condition";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

require("dotenv").config();

const token_secret = process.env.TOKEN_SECRET || "this-is-a-secret";

export const getUser = async (req: Request, res: Response) => {
  return res
    .status(200)
    .send({ success: true, data: [{ msg: "Get User dummy" }] });
};

// @desc   Make a user log in
// @route  Post /api/v1/login
export const loginUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { email, password } = req.body;

    const condition = new Condition({ where: { email } });
    const model = new User({ email, password });
    await model.read(condition);
    let response = model.response;
    let user = response.data[0];

    // By Pass root user
    if (email === "root@admin.com") {
      user = {
        id: 1,
        email: "root@admin.com",
      };
      response.success = true;
    }
    console.log("User at login controller", user);
    if (
      email === "root@admin.com" ||
      (response.success && (await bcrypt.compare(password, user.password)))
    ) {
      // Set jwt token in header
      console.log(
        "Sign token :",
        { id: user._id, email: user.email },
        token_secret
      );
      const token = await jwt.sign(
        { id: user._id, email: user.email },
        token_secret
      );
      return res.status(200).send({
        success: true,
        data: [{ id: user._id, email: user.email, token }],
      });
    } else {
      return res.status(200).send({
        success: false,
        data: [{ email: "Incorrect email or password" }],
      });
    }
  } catch (error) {
    console.log("Error at login ", error);
    return res
      .status(403)
      .send({ success: false, data: [{ server: "Server error" }] });
  }
};
