import { UserDocument } from "../documents/UserDocument";
import { Request } from "express";
import mongoose from "mongoose";

export interface ExtendedRequest extends Request {
  user?: mongoose.Types.ObjectId;
}
