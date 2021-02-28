import { Request, Response, NextFunction } from "express";
import { Database } from "../models/base/Database";
import Condition from "../models/base/Condition";
import Setting from "../models/Setting";


// @desc   Get a Model
// @route  GET /api/v1/settings/:id
export const getSetting = async (req: Request, res: Response, next: NextFunction) => {
    const condition = new Condition({where: {p_id: 1}});
    const model = new Setting(req.body.setting);
    await model.read(condition);
    return res.status(200).send(model.response);
};

// @desc   Update a Model
// @route  UPDATE /api/v1/settings
export const updateSetting = async (req: Request, res: Response, next: NextFunction) => {
    const condition = new Condition({where: {p_id: 1}});
    const model = new Setting(req.body.setting);
    await model.validate() && await model.update(condition);
    console.log("UPDATE /api/v1/settings");
    return res.status(200).send(model.response);
};

// @desc   Delete Model
// @route  DELETE /api/v1/crud
export const deleteSetting = async (req: Request, res: Response, next: NextFunction) => {
    const model = new Setting(req.body.setting);
    const condition = new Condition({where: {p_id: 1}});
    await model.delete(condition);
    return res.status(200).send(model.response);
};
