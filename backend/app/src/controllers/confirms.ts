import { Request, Response, NextFunction } from "express";

export const getConfirms = async (req: Request, res: Response) => {
  return res
    .status(200)
    .send({ success: true, data: [{ msg: "Get Confirms dummy" }] });
};
